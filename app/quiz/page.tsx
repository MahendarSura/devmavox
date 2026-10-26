'use client';

import { useState } from 'react';
import Link from 'next/link';

// Importing separate question files for each tool
import { linuxQuestions } from './linuxQuestions';
import { gitQuestions } from './gitQuestions';
import { dockerQuestions } from './dockerQuestions';
import { kubernetesQuestions } from './kubernetesQuestions';
import { awsQuestions } from './awsQuestions';
import { terraformQuestions } from './terraformQuestions';
import { jenkinsQuestions } from './jenkinsQuestions';
import { argocdQuestions } from './argocdQuestions';
import { ansibleQuestions } from './ansibleQuestions';
import { prometheusQuestions } from './prometheusQuestions';
import { grafanaQuestions } from './grafanaQuestions';
import { tomcatQuestions } from './tomcatQuestions';
import { jiraQuestions } from './jiraQuestions';
import { githubActionsQuestions } from './githubActionsQuestions';
import { nexusQuestions } from './nexusQuestions';
import { helmQuestions } from './helmQuestions';
import { eksQuestions } from './eksQuestions';
import { mavenQuestions } from './mavenQuestions';
import { sonarqubeQuestions } from './sonarqubeQuestions';
import { kubernetesAdvancedQuestions } from './kubernetes-advanced';
import { terraformIacAdvancedQuestions } from './terraform-iac-advanced';
import { productionIncidentsSreQuestions } from './production-incidents-sre';
import { ciCdPipelinesJenkinsQuestions } from './ci-cd-pipelines-jenkins';
import { systemDesignDevOpsQuestions } from './system-design-devops';
import { cloudCostOptimizationQuestions } from './cloud-cost-optimization';
import { gitopsQuestions } from './gitops';
import { linuxtroubleshootingQuestions } from './linux-troubleshooting';
import { devsecopsQuestions } from './devsecops';
import { observabilityloggingQuestions } from './observability-logging';
import { awsAdvancedQuestions } from './aws-advanced';
import { pythonBashScriptingQuestions } from './python-bash-scripting';
import { nginxLoadBalancingQuestions } from './nginx-load-balancing';
import { networkingdnsQuestions } from './networking-dns';

interface Topic {
  id: string;
  name: string;
  description: string;
}

const topics: Topic[] = [
  { id: 'linux', name: 'Linux', description: 'Commands, file permissions, and system administration.' },
  { id: 'git', name: 'Git & GitHub', description: 'Version control, branching, merging, and collaboration.' },
  { id: 'github-actions', name: 'GitHub Actions', description: 'CI/CD workflows and task automation directly in GitHub.' },
  { id: 'docker', name: 'Docker', description: 'Containerization, Dockerfiles, and image management.' },
  { id: 'kubernetes', name: 'Kubernetes', description: 'Pods, deployments, services, and cluster orchestration.' },
  { id: 'eks', name: 'Amazon EKS', description: 'Managed Kubernetes clusters on AWS control plane.' },
  { id: 'aws', name: 'AWS', description: 'EC2, S3, IAM, VPC, and cloud infrastructure.' },
  { id: 'terraform', name: 'Terraform', description: 'Infrastructure as Code (IaC), state management, and providers.' },
  { id: 'jenkins', name: 'Jenkins', description: 'CI/CD pipelines, automation servers, and plugins.' },
  { id: 'argocd', name: 'ArgoCD', description: 'GitOps continuous delivery and synchronization.' },
  { id: 'ansible', name: 'Ansible', description: 'Configuration management and automation playbooks.' },
  { id: 'prometheus', name: 'Prometheus', description: 'Monitoring, metrics, and time-series alerting.' },
  { id: 'grafana', name: 'Grafana', description: 'Data visualization, metrics analytics, and monitoring dashboards.' },
  { id: 'tomcat', name: 'Apache Tomcat', description: 'Java servlet containers and web application deployment.' },
  { id: 'jira', name: 'Jira & Agile', description: 'Project tracking, scrum boards, and sprint planning.' },
  { id: 'nexus', name: 'Sonatype Nexus', description: 'Artifact repository manager for builds, packages, and dependencies.' },
  { id: 'helm', name: 'Helm', description: 'Kubernetes package manager and chart templating.' },
  { id: 'maven', name: 'Apache Maven', description: 'Java build automation and dependency management.' },
  { id: 'sonarqube', name: 'SonarQube', description: 'Continuous inspection of code quality and security analysis.' },
  { id: 'kubernetes-advanced', name: 'Kubernetes Advanced', description: 'PDBs, Probes, StatefulSets, Taints, Tolerations, and scheduling.' },
  { id: 'terraform-iac-advanced', name: 'Terraform Advanced (IaC)', description: 'State management, modules, drift detection, and refactoring.' },
  { id: 'production-incidents-sre', name: 'Production Incidents & SRE', description: 'SLOs, SLIs, error budgets, postmortems, and incident response.' },
  { id: 'ci-cd-pipelines-jenkins', name: 'CI/CD Pipelines (Jenkins Advanced)', description: 'Shared libraries, declarative pipelines, and security.' },
  { id: 'system-design-devops', name: 'System Design DevOps', description: 'Scalability, high availability, CAP theorem, and distributed systems.' },
  { id: 'cloud-cost-optimization', name: 'Cloud Cost Optimization (FinOps)', description: 'Right-sizing, spot instances, tagging, and financial governance.' },
  { id: 'gitops', name: 'GitOps & ArgoCD Advanced', description: 'Declarative continuous delivery, sync policies, and patterns.' },
  { id: 'linux-troubleshooting', name: 'Linux Troubleshooting', description: 'Kernel diagnostics, performance tuning, and deep debugging.' },
  { id: 'devsecops', name: 'DevSecOps', description: 'Container security scanning, SAST/DAST, and vulnerability management.' },
  { id: 'observability-logging', name: 'Observability & Logging', description: 'Advanced tracing, centralized logging, and metrics telemetry.' },
  { id: 'aws-advanced', name: 'AWS Advanced Architecture', description: 'Complex cloud networking, IAM, VPC peering, and high availability.' },
  { id: 'python-bash-scripting', name: 'Python & Bash Scripting', description: 'Automation scripts, file handling, and DevOps tooling.' },
  { id: 'nginx-load-balancing', name: 'Nginx & Load Balancing', description: 'Reverse proxy configurations, SSL termination, and traffic routing.' },
  { id: 'networking-dns', name: 'Networking & DNS', description: 'Subnetting, TCP/IP, DNS resolution, and routing troubleshooting.' },
];

const topicQuestions: Record<string, { question: string; options: string[]; answer: number }[]> = {
  linux: linuxQuestions,
  git: gitQuestions,
  'github-actions': githubActionsQuestions,
  docker: dockerQuestions,
  kubernetes: kubernetesQuestions,
  eks: eksQuestions,
  aws: awsQuestions,
  terraform: terraformQuestions,
  jenkins: jenkinsQuestions,
  argocd: argocdQuestions,
  ansible: ansibleQuestions,
  prometheus: prometheusQuestions,
  grafana: grafanaQuestions,
  tomcat: tomcatQuestions,
  jira: jiraQuestions,
  nexus: nexusQuestions,
  helm: helmQuestions,
  maven: mavenQuestions,
  sonarqube: sonarqubeQuestions,
  'kubernetes-advanced': kubernetesAdvancedQuestions,
  'terraform-iac-advanced': terraformIacAdvancedQuestions,
  'production-incidents-sre': productionIncidentsSreQuestions,
  'ci-cd-pipelines-jenkins': ciCdPipelinesJenkinsQuestions,
  'system-design-devops': systemDesignDevOpsQuestions,
  'cloud-cost-optimization': cloudCostOptimizationQuestions,
  'gitops': gitopsQuestions,
  'linux-troubleshooting': linuxtroubleshootingQuestions,
  'devsecops': devsecopsQuestions,
  'observability-logging': observabilityloggingQuestions,
  'aws-advanced': awsAdvancedQuestions,
  'python-bash-scripting': pythonBashScriptingQuestions,
  'nginx-load-balancing': nginxLoadBalancingQuestions,
  'networking-dns': networkingdnsQuestions,
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

