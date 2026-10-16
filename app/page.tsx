'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Topic {
  id: string;
  name: string;
  description: string;
}

const topics: Topic[] = [
  { id: 'linux', name: 'Linux', description: 'Commands, file permissions, and system administration.' },
  { id: 'git', name: 'Git & GitHub', description: 'Version control, branching, merging, and collaboration.' },
  { id: 'docker', name: 'Docker', description: 'Containerization, Dockerfiles, and image management.' },
  { id: 'kubernetes', name: 'Kubernetes', description: 'Pods, deployments, services, and cluster orchestration.' },
  { id: 'aws', name: 'AWS', description: 'EC2, S3, IAM, VPC, and cloud infrastructure.' },
  { id: 'terraform', name: 'Terraform', description: 'Infrastructure as Code (IaC), state management, and providers.' },
  { id: 'jenkins', name: 'Jenkins', description: 'CI/CD pipelines, automation servers, and plugins.' },
  { id: 'argocd', name: 'ArgoCD', description: 'GitOps continuous delivery and synchronization.' },
  { id: 'ansible', name: 'Ansible', description: 'Configuration management and automation playbooks.' },
  { id: 'prometheus', name: 'Prometheus & Grafana', description: 'Monitoring, metrics, and observability dashboards.' },
  { id: 'tomcat', name: 'Apache Tomcat', description: 'Java servlet containers and web application deployment.' },
  { id: 'jira', name: 'Jira & Agile', description: 'Project tracking, scrum boards, and sprint planning.' },
];

const topicQuestions: Record<string, { question: string; options: string[]; answer: number }[]> = {
  linux: [
    { question: 'Which command is used to check disk space usage in Linux?', options: ['ls', 'df -h', 'ps aux', 'top'], answer: 1 },
    { question: 'Which permission code represents read, write, and execute for owner only (700)?', options: ['chmod 700', 'chmod 755', 'chmod 644', 'chmod 777'], answer: 0 }
  ],
  git: [
    { question: 'Which command creates a new branch and switches to it immediately?', options: ['git branch', 'git checkout -b', 'git commit -m', 'git push'], answer: 1 },
    { question: 'How do you check the repository status in Git?', options: ['git log', 'git status', 'git init', 'git fetch'], answer: 1 }
  ],
  docker: [
    { question: 'Which instruction sets the working directory in a Dockerfile?', options: ['RUN', 'CMD', 'WORKDIR', 'ENV'], answer: 2 },
    { question: 'Which command lists all running and stopped Docker containers?', options: ['docker ps', 'docker ps -a', 'docker images', 'docker run'], answer: 1 }
  ],
  kubernetes: [
    { question: 'Which Kubernetes object is used to expose a deployment externally?', options: ['Pod', 'Service', 'ConfigMap', 'Namespace'], answer: 1 },
    { question: 'What is the default command-line tool to interact with a K8s cluster?', options: ['docker', 'kubectl', 'helm', 'k8s'], answer: 1 }
  ],
  aws: [
    { question: 'Which AWS service is used for object storage?', options: ['Amazon EBS', 'Amazon S3', 'Amazon EC2', 'AWS RDS'], answer: 1 },
    { question: 'What does IAM stand for in AWS?', options: ['Internet Access Management', 'Identity and Access Management', 'Instance Architecture Model', 'Internal Automation Module'], answer: 1 }
  ],
  terraform: [
    { question: 'What command is used to preview infrastructure changes in Terraform?', options: ['terraform init', 'terraform apply', 'terraform plan', 'terraform destroy'], answer: 2 },
    { question: 'Where does Terraform store state data by default?', options: ['terraform.tfstate', 'state.json', 'aws s3 bucket', 'cache.db'], answer: 0 }
  ],
  jenkins: [
    { question: 'What file defines a Jenkins Pipeline configuration?', options: ['Dockerfile', 'Jenkinsfile', 'pipeline.yaml', 'build.xml'], answer: 1 },
    { question: 'What is the primary concept for running tasks in Jenkins?', options: ['Jobs / Pipelines', 'Pods', 'Playbooks', 'Recipes'], answer: 0 }
  ],
  argocd: [
    { question: 'What is the primary role of ArgoCD?', options: ['Container building', 'Continuous declarative GitOps delivery', 'Network routing', 'Log aggregation'], answer: 1 },
    { question: 'ArgoCD continuously monitors Git and syncs with which environment?', options: ['AWS S3', 'Kubernetes Cluster', 'Docker Hub', 'Jenkins Server'], answer: 1 }
  ],
  ansible: [
    { question: 'In what format are Ansible playbooks written?', options: ['JSON', 'YAML', 'XML', 'Python'], answer: 1 },
    { question: 'What protocol does Ansible use by default to connect to remote nodes?', options: ['SSH', 'Telnet', 'HTTP', 'FTP'], answer: 0 }
  ],
  prometheus: [
    { question: 'Which query language is used by Prometheus?', options: ['SQL', 'PromQL', 'LogQL', 'GraphQL'], answer: 1 },
    { question: 'Grafana is primarily used for what purpose?', options: ['Code compilation', 'Data visualization and dashboards', 'Container orchestration', 'Version control'], answer: 1 }
  ],
  tomcat: [
    { question: 'Apache Tomcat is primarily a container for which language/technology?', options: ['Node.js', 'Java Servlets & JSPs', 'Python Flask', 'PHP'], answer: 1 },
    { question: 'What is the default port for Apache Tomcat web server?', options: ['80', '443', '8080', '3306'], answer: 2 }
  ],
  jira: [
    { question: 'Jira is widely used for which methodology?', options: ['Agile / Scrum / Kanban', 'Waterfall', 'Sequential testing', 'Static code analysis'], answer: 0 },
    { question: 'What represents a unit of work or task in Jira?', options: ['Commit', 'Issue / Ticket', 'Branch', 'Pod'], answer: 1 }
  ]
};

export default function QuizPage() {
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = activeTopic ? topicQuestions[activeTopic.id] || [] : [];

  const handleSelectTopic = (topic: Topic) => {
    setActiveTopic(topic);
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setScore(0);
    setIsFinished(false);
  };

  const handleNext = () => {
    if (selectedOpt === questions[currentQIndex].answer) {
      setScore(score + 1);
    }

    const nextIdx = currentQIndex + 1;
    if (nextIdx < questions.length) {
      setCurrentQIndex(nextIdx);
      setSelectedOpt(null);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-10 flex flex-col justify-between">
      {/* Navbar */}
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center pb-4 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wider text-cyan-400">Devmavox Quiz</h1>
        <Link href="/" className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-xl transition border border-gray-700">
          ← Main Menu
        </Link>
      </div>

      <div className="max-w-5xl mx-auto w-full py-8 flex-grow">
        {!activeTopic ? (
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-white mb-2">Quiz Practice</h2>
              <p className="text-gray-400 text-sm">Choose a topic to start your DevOps practice.</p>
            </div>

            {/* Grid Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleSelectTopic(t)}
                  className="bg-gray-900 border border-gray-800 hover:border-cyan-500/50 p-6 rounded-2xl shadow-xl transition cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition">{t.name}</h3>
                    <p className="text-gray-400 text-xs">{t.description}</p>
                  </div>
                  <div className="mt-6 text-xs font-semibold text-cyan-400 flex items-center gap-1">
                    Practice Quiz →
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setActiveTopic(null)}
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
              >
                ← Back to Topics
              </button>
              <span className="bg-cyan-950 text-cyan-400 px-2.5 py-1 rounded-md border border-cyan-800/50 text-xs font-medium">
                {activeTopic.name}
              </span>
            </div>

            {isFinished ? (
              <div className="text-center py-6">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">Quiz Completed! 🎉</h3>
                <p className="text-gray-300 mb-6">
                  You scored <span className="text-cyan-400 font-bold text-lg">{score}</span> out of <span className="font-bold text-lg">{questions.length}</span>
                </p>
                <button
                  onClick={() => setActiveTopic(null)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
                >
                  Choose Another Topic
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2 text-xs text-gray-400">
                  <span>Question {currentQIndex + 1} of {questions.length}</span>
                </div>

                <h3 className="text-lg font-semibold mb-6 text-white">{questions[currentQIndex]?.question}</h3>

                <div className="flex flex-col gap-3 mb-8">
                  {questions[currentQIndex]?.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedOpt(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition text-sm flex items-center justify-between ${
                        selectedOpt === idx
                          ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                          : 'bg-gray-800/40 border-gray-700/80 hover:bg-gray-800 text-gray-200'
                      }`}
                    >
                      <span>{opt}</span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedOpt === idx ? 'border-cyan-400 bg-cyan-400/20' : 'border-gray-600'}`}>
                        {selectedOpt === idx && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={selectedOpt === null}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition ${
                    selectedOpt === null
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-gray-950 shadow-lg shadow-cyan-500/20'
                  }`}
                >
                  {currentQIndex === questions.length - 1 ? 'Finish & See Score' : 'Next Question'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-800">
        © 2026 Devmavox Platform.
      </div>
    </div>
  );
}
