'use client';

import { useState } from 'react';
import Link from 'next/link';

const quizQuestions = [
  {
    id: 1,
    category: 'Kubernetes',
    question: 'Which Kubernetes object is used to expose a deployment externally?',
    options: ['Pod', 'Service', 'ConfigMap', 'Namespace'],
    answer: 1,
  },
  {
    id: 2,
    category: 'Terraform',
    question: 'What command is used to preview infrastructure changes in Terraform?',
    options: ['terraform init', 'terraform apply', 'terraform plan', 'terraform destroy'],
    answer: 2,
  },
  {
    id: 3,
    category: 'Docker',
    question: 'Which instruction in a Dockerfile sets the working directory?',
    options: ['RUN', 'WORKDIR', 'ENV', 'CMD'],
    answer: 1,
  },
  {
    id: 4,
    category: 'AWS',
    question: 'Which AWS service is fully managed for running Kubernetes clusters?',
    options: ['AWS ECS', 'Amazon EKS', 'AWS EC2', 'AWS Lambda'],
    answer: 1,
  },
  {
    id: 5,
    category: 'CI/CD & GitOps',
    question: 'What is the primary role of ArgoCD in a Kubernetes environment?',
    options: [
      'Container image building',
      'Continuous declarative GitOps delivery',
      'Network traffic encryption',
      'Database provisioning'
    ],
    answer: 1,
  },
];

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    if (selectedOption === quizQuestions[currentIndex].answer) {
      setScore(score + 1);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  const q = quizQuestions[currentIndex];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-10 flex flex-col justify-between">
      {/* Navbar */}
      <div className="max-w-xl mx-auto w-full flex justify-between items-center pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-xl font-bold tracking-wider text-cyan-400">Devmavox Quiz</h1>
        </div>
        <Link href="/" className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-xl transition border border-gray-700">
          ← Back to Home
        </Link>
      </div>

      {/* Quiz Card */}
      <div className="max-w-xl mx-auto w-full py-10">
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl">
          {isFinished ? (
            <div className="text-center py-6">
              <h2 className="text-2xl font-bold mb-3 text-cyan-400">Quiz Completed! 🎉</h2>
              <p className="text-gray-300 mb-6">
                You scored <span className="text-cyan-400 font-bold text-lg">{score}</span> out of <span className="font-bold text-lg">{quizQuestions.length}</span>
              </p>
              <button
                onClick={restartQuiz}
                className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4 text-xs">
                <span className="bg-cyan-950 text-cyan-400 px-2.5 py-1 rounded-md border border-cyan-800/50 font-medium">
                  {q.category}
                </span>
                <span className="text-gray-400">
                  Question {currentIndex + 1} of {quizQuestions.length}
                </span>
              </div>

              <h2 className="text-lg font-semibold mb-6 text-white">{q.question}</h2>

              {/* Options Stacked Properly with Radio Indicator */}
              <div className="flex flex-col gap-3 mb-8">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition text-sm flex items-center justify-between ${
                      selectedOption === idx
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                        : 'bg-gray-800/40 border-gray-700/80 hover:bg-gray-800 text-gray-200'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedOption === idx ? 'border-cyan-400 bg-cyan-400/20' : 'border-gray-600'}`}>
                      {selectedOption === idx && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition ${
                  selectedOption === null
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-gray-950 shadow-lg shadow-cyan-500/20'
                }`}
              >
                {currentIndex === quizQuestions.length - 1 ? 'Finish & See Score' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-2">
        © 2026 Devmavox Platform.
      </div>
    </div>
  );
}
