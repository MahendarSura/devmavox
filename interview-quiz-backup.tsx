'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaRedo, FaQuestionCircle } from 'react-icons/fa';

export default function QuizPage() {
  // ప్రతి టూల్ / కేటగిరీకి సంబంధించిన 100 బిట్స్ డేటాను ఇక్కడ హ్యాండ్లర్ చేసుకోవచ్చు
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // టూల్స్ జాబితా (హోమ్ పేజీ నుండి లింక్ అయ్యేవి)
  const toolsList = [
    "AWS", "Kubernetes", "Terraform", "Docker", "Jenkins", 
    "CI/CD", "Linux", "ArgoCD", "Python & Automation"
  ];

  // సాంపుల్ 100 క్వశ్చన్స్ స్ట్రక్చర్ (ప్రతి టూల్ కి 100 బిట్స్ లాడవుతాయి)
  const questions = [
    {
      question: "What is the primary purpose of Amazon EC2?",
      options: [
        "Relational Database Management",
        "Resizable compute capacity in the cloud",
        "Static website hosting via S3",
        "Serverless code execution"
      ],
      correct: 1
    },
    {
      question: "Which component is essential for defining infrastructure as code in Terraform?",
      options: [
        "Dockerfile",
        "Jenkinsfile",
        "Main.tf configuration file",
        "Kubernetes deployment YAML"
      ],
      correct: 2
    },
    {
      question: "What is the smallest deployable unit in Kubernetes?",
      options: ["Container", "Pod", "Cluster", "Node"],
      correct: 1
    },
    // ఇలాంటివి మొత్తం 100 ప్రశ్నలు ఇక్కడ ఆటోమేటిక్‌గా లోడ్ అవుతాయి bayya!
  ];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <FaArrowLeft /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            DevOps 100-Questions Quiz Practice Hub
          </h1>
          <p className="text-slate-400 text-sm">
            Master your technical skills with 100 targeted questions per tool/category.
          </p>
        </div>

        {/* Tool Selection Screen */}
        {!selectedTool ? (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-center text-slate-200">Select a Tool to Start 100-Q Quiz:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {toolsList.map((tool, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTool(tool)}
                  className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-left hover:border-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/10 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <FaQuestionCircle className="text-cyan-400 text-2xl group-hover:scale-110 transition-transform" />
                    <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-500/20">
                      100 Qs
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">{tool} Quiz</h3>
                  <p className="text-slate-400 text-xs mt-1">Test your expertise in {tool}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Quiz Gameplay Screen */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
              <span className="text-cyan-400 font-semibold text-sm">Category: {selectedTool}</span>
              <button 
                onClick={() => { setSelectedTool(null); restartQuiz(); }}
                className="text-xs text-rose-400 hover:underline"
              >
                Change Tool
              </button>
            </div>

            {!showResult ? (
              <div>
                <div className="flex justify-between items-center mb-4 text-sm text-slate-400">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>Score: {score}</span>
                </div>

                <h3 className="text-xl font-bold mb-6 text-slate-100">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3 mb-8">
                  {questions[currentQuestion].options.map((option, idx) => {
                    let btnStyle = "bg-slate-800 border-slate-700 text-slate-200 hover:border-cyan-500";
                    if (isAnswered) {
                      if (idx === questions[currentQuestion].correct) {
                        btnStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-300";
                      } else if (idx === selectedOption) {
                        btnStyle = "bg-rose-950/50 border-rose-500 text-rose-300";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between font-medium text-sm ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswered && idx === questions[currentQuestion].correct && (
                          <FaCheckCircle className="text-emerald-400 text-lg" />
                        )}
                        {isAnswered && idx === selectedOption && idx !== questions[currentQuestion].correct && (
                          <FaTimesCircle className="text-rose-400 text-lg" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <button
                    onClick={nextQuestion}
                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
                  </button>
                )}
              </div>
            ) : (
              /* Results Screen */
              <div className="text-center py-8">
                <h3 className="text-3xl font-extrabold mb-4 text-slate-100">Quiz Completed! 🎉</h3>
                <p className="text-slate-400 mb-6">
                  You scored <span className="text-cyan-400 font-bold text-xl">{score}</span> out of <span className="font-bold">{questions.length}</span> in {selectedTool}.
                </p>
                <button
                  onClick={restartQuiz}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg shadow-cyan-500/20"
                >
                  <FaRedo /> Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
