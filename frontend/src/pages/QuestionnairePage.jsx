import Questionnaire from '../components/Questionnaire'; // Adjust the import path based on your project structure

const QuestionnairePage = ({ token }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Candidate Questionnaire</h1>
      <Questionnaire token={token} />
    </div>
  );
};

export default QuestionnairePage;
