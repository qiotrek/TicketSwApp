import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { makeRequestGet, makeRequestPut, makeRequestPatch } from "../Hooks/makeRequest"; // Dodajemy `makeRequestPatch`
import { showErrorMessage, showSuccessMessage } from "../Hooks/useAlert";
import Modal from "../Modals/Modal";  // Importowanie komponentu modalnego

export default function AdminPanel() {
  const { user } = useAuth();
  const [propositions, setPropositions] = useState<NewActionProposition[]>([]);
  const [problemsAndQuestions, setProblemsAndQuestions] = useState<ProblemsAndQuestionsModel[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<ProblemsAndQuestionsModel | null>(null); // Stan do przechowywania wybranego zgłoszenia
  const [isModalOpen, setIsModalOpen] = useState(false); // Stan do kontrolowania modalu
  const [answer, setAnswer] = useState(''); // Pole odpowiedzi

  useEffect(() => {
    makeRequestGet(
      '/NewActionsPropositions', 
      user?.accessToken as string,
      (error, data) => {
        if (error) {
          showErrorMessage("Wystąpił błąd: " + error.message);
          return;
        }
        showSuccessMessage("Dane zostały załadowane");
        setPropositions(data);
      }
    );

    makeRequestGet(
      '/Admin/ProblemsAndQuestions', 
      user?.accessToken as string,
      (error, data) => {
        if (error) {
          showErrorMessage("Wystąpił błąd: " + error.message);
          return;
        }
        setProblemsAndQuestions(data);
      }
    );
  }, [user?.accessToken]);

  interface NewActionProposition {
    id: string;
    name: string;
    eventDate: string;
    intrestedCount: number;
    intrestedEmails: string[];
  }

  interface ProblemsAndQuestionsModel {
    id: string;
    userId: string;
    title: string;
    message: string;
    status: number;
    answer: string;
    createDate: string;
    updateDate: string;
    updateLogin: string;
  }

  const handleAccept = (id: string) => {
    const requestBody = { id };
    makeRequestPut(
      `/Admin/Accept?id=${id}`, 
      user?.accessToken as string,
      requestBody, 
      (error, response) => {
        if (error) {
          showErrorMessage("Wystąpił błąd: " + error.message);
          return;
        }
        response
          ? showSuccessMessage("Zgłoszenie zostało zaakceptowane")
          : showErrorMessage("Coś poszło nie tak! Spróbuj ponownie");
      }
    );
  };

  const handleReject = (id: string) => {
    const requestBody = { id };
    makeRequestPut(
      `/Admin/Reject?id=${id}`, 
      user?.accessToken as string,
      requestBody, 
      (error, response) => {
        if (error) {
          showErrorMessage("Wystąpił błąd: " + error.message);
          return;
        }
        response
          ? showSuccessMessage("Zgłoszenie zostało odrzucone")
          : showErrorMessage("Coś poszło nie tak! Spróbuj ponownie");
      }
    );
  };

  const openModalWithProblem = (problem: ProblemsAndQuestionsModel) => {
    setSelectedProblem(problem);
    setIsModalOpen(true);
  
    if (problem.status === 0) {
      makeRequestPatch(
        `/Admin/ProblemsAndQuestions?id=${problem.id}`,
        user?.accessToken as string,
        {},
        (error, response) => {
          if (error) {
            showErrorMessage("Wystąpił błąd podczas oznaczania zgłoszenia: " + error.message);
          } else if (response === true) {
            // Zaktualizuj lokalny stan problemsAndQuestions, aby zmienić status zgłoszenia
            setProblemsAndQuestions((prevProblems) =>
              prevProblems.map((p) =>
                p.id === problem.id ? { ...p, status: 1 } : p
              )
            );
          }
        }
      );
    }
  };

  const closeModal = () => {
    setSelectedProblem(null);
    setIsModalOpen(false);
    setAnswer('');
  };

  const handleAnswerSubmit = () => {
    if (!selectedProblem) return;

    const requestBody = {
      id: selectedProblem.id,
      answer
    };

    makeRequestPut(
      `/ProblemsAndQuestions/Answer`, 
      user?.accessToken as string,
      requestBody, 
      (error, response) => {
        if (error) {
          showErrorMessage("Wystąpił błąd podczas wysyłania odpowiedzi: " + error.message);
          return;
        }
        showSuccessMessage("Odpowiedź została wysłana");
        closeModal();
      }
    );
  };

  return (
    <div className="mt-20 flex flex-row gap-5">
      <div className="flex-1 flex flex-col">
        <h3 className="text-2xl mx-auto my-4">
          <strong>Zgłoszenia nowych Akcji</strong>
        </h3>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">ID</th>
                <th scope="col" className="px-6 py-3 text-center">Nazwa</th>
                <th scope="col" className="px-6 py-3 text-center">Data Wydarzenia</th>
                <th scope="col" className="px-6 py-3 text-center">Ilość Zainteresowanych</th>
                <th scope="col" className="px-6 py-3 text-center">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {propositions.map((proposition) => (
                <tr key={proposition.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                    {proposition.id}
                  </th>
                  <td className="px-6 py-4 text-center">{proposition.name}</td>
                  <td className="px-6 py-4 text-center">{new Date(proposition.eventDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center">{proposition.intrestedCount}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col gap-1 justify-center items-center space-x-2">
                      <button
                        className="bg-green-500 text-white mx-auto px-2 py-1 rounded"
                        onClick={() => handleAccept(proposition.id)}
                      >
                        Akceptuj
                      </button>
                      <button
                        className="bg-red-500 text-white mx-auto px-2 py-1 rounded"
                        onClick={() => handleReject(proposition.id)}
                      >
                        Odrzuć
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-2xl mx-auto my-4">
          <strong>Zapytania od Klientów</strong>
        </h3>
        <ul className="space-y-4 p-4  rounded-lg">
        {problemsAndQuestions.map((problem) => (
            <li
            key={problem.id}
            className={`p-4 bg-gray-200 rounded-lg cursor-pointer ${problem.status === 0 ? "font-bold" : ""}`}
            onClick={() => openModalWithProblem(problem)}
            >
            <p className="text-lg">{problem.title}</p>
            <p className="text-sm text-gray-600">
                Data: {new Date(problem.createDate).toLocaleDateString()}
            </p>
            </li>
        ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProblem && (
        <Modal onClose={closeModal} modalWidthClass="max-w-lg">
          <h3 className="text-xl font-bold mb-4">{selectedProblem.title}</h3>
          <p className="pb-3"><strong>Użytkownik:</strong> {selectedProblem.userId}</p>
          <textarea
            className="w-full h-40 p-2 border rounded-lg mb-4"
            value={selectedProblem.message}
            readOnly
          />
          <p><strong>Data utworzenia:</strong> {new Date(selectedProblem.createDate).toLocaleDateString()}</p>
          <p className="pb-3"><strong>Status:</strong> {selectedProblem.status === 0 ? "Nowe" :(selectedProblem.status === 1 ?"Otwarte": "Zakończone")}</p>

          <textarea
            className="w-full h-20 p-2 border rounded-lg mb-4"
            placeholder="Wpisz odpowiedź..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAnswerSubmit}
            >
              Wyślij odpowiedź
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
