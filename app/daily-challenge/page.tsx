"use client";

import { useState } from "react";
import { dockerChallenge } from "./docker-challenge";
import { kubernetesChallenge } from "./kubernetes-challenge";
import { ansibleChallenge } from "./ansible-challenge";
import { terraformChallenge } from "./terraform-challenge";
import { jenkinsChallenge } from "./jenkins-challenge";
import { gitChallenge } from "./git-challenge";
import { linuxChallenge } from "./linux-challenge";
import { awsChallenge } from "./aws-challenge";
import { azureChallenge } from "./azure-challenge";
import { gcpChallenge } from "./gcp-challenge";
import { helmChallenge } from "./helm-challenge";
import { prometheusChallenge } from "./prometheus-challenge";
import { grafanaChallenge } from "./grafana-challenge";
import { argoCdChallenge } from "./argo-cd-challenge";
import { githubActionsChallenge } from "./github-actions-challenge";
import { sonarqubeChallenge } from "./sonarqube-challenge";
import { trivyChallenge } from "./trivy-challenge";
import { nginxChallenge } from "./nginx-challenge";

const challenges = [
  dockerChallenge,
  kubernetesChallenge,
  ansibleChallenge,
  terraformChallenge,
  jenkinsChallenge,
  gitChallenge,
  linuxChallenge,
  awsChallenge,
  azureChallenge,
  gcpChallenge,
  helmChallenge,
  prometheusChallenge,
  grafanaChallenge,
  argoCdChallenge,
  githubActionsChallenge,
  sonarqubeChallenge,
  trivyChallenge,
  nginxChallenge,
] as const;

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const challenge = challenges[currentIndex];

  function selectChallenge(value: string) {
    setCurrentIndex(Number(value));
    setShowAnswer(false);
  }

  function nextChallenge() {
    setCurrentIndex((currentIndex + 1) % challenges.length);
    setShowAnswer(false);
  }

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10 text-gray-100 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <a
          href="/"
          className="text-sm text-cyan-400 hover:text-cyan-300"
        >
          ← Back to Home
        </a>

        <header className="mb-8 mt-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Daily DevOps Challenge
          </p>
          <h1 className="text-3xl font-bold sm:text-5xl">
            Test Your DevOps Skills
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Practice one challenge at a time across 18 popular DevOps tools.
            Learn, reveal the answer, and move to the next challenge.
          </p>
        </header>

        <section className="rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-xl sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-cyan-800 bg-cyan-950 px-3 py-1 text-sm text-cyan-300">
              Challenge {currentIndex + 1} of {challenges.length}
            </span>
            <span className="text-sm text-gray-400">
              Tool: {challenge.tool}
            </span>
          </div>

          <label
            htmlFor="tool-select"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Choose a DevOps tool
          </label>
          <select
            id="tool-select"
            value={currentIndex}
            onChange={(event) => selectChallenge(event.target.value)}
            className="mb-8 w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 outline-none focus:border-cyan-500"
          >
            {challenges.map((item, index) => (
              <option key={item.tool} value={index}>
                {item.tool}
              </option>
            ))}
          </select>

          <div className="rounded-xl border border-gray-800 bg-gray-950 p-5 sm:p-7">
            <p className="mb-3 text-sm font-medium text-cyan-400">
              YOUR CHALLENGE
            </p>
            <h2 className="text-xl font-semibold leading-relaxed sm:text-2xl">
              {challenge.question}
            </h2>

            {showAnswer ? (
              <div className="mt-6 rounded-xl border border-emerald-800 bg-emerald-950/40 p-4">
                <p className="mb-2 text-sm font-semibold text-emerald-400">
                  CORRECT ANSWER
                </p>
                <p className="leading-relaxed text-emerald-100">
                  {challenge.answer}
                </p>
              </div>
            ) : (
              <p className="mt-5 text-sm text-gray-500">
                Try answering the question yourself before revealing the answer.
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setShowAnswer(!showAnswer)}
              className="flex-1 rounded-xl border border-cyan-700 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-950"
            >
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>

            <button
              type="button"
              onClick={nextChallenge}
              className="flex-1 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-gray-950 transition hover:bg-cyan-400"
            >
              Next Challenge →
            </button>
          </div>
        </section>

        <p className="mt-6 text-center text-sm text-gray-500">
          Keep practising every day. Small steps lead to strong DevOps skills!
        </p>
      </div>
    </main>
  );
}
