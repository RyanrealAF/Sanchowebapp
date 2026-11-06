import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';
import { PROTOCOL_SCENARIOS, ScenarioItem } from '../utils/companionData';
import { evaluateProtocolChoice, ProtocolEvaluation } from '../utils/bookLogic';
import { soundscapes } from '../utils/ambientAudio';

export const ProtocolFieldTest: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userChoices, setUserChoices] = useState<Record<string, 'A' | 'B' | 'C'>>({});
  const [evaluations, setEvaluations] = useState<Record<string, ProtocolEvaluation>>({});
  const [testFinished, setTestFinished] = useState(false);

  const scenario: ScenarioItem = PROTOCOL_SCENARIOS[currentScenarioIndex];
  const currentChoice = userChoices[scenario.id];
  const currentEvaluation = evaluations[scenario.id];

  const handleSelectChoice = (key: 'A' | 'B' | 'C') => {
    soundscapes.playPageTurn();
    const evaluation = evaluateProtocolChoice(scenario.id, key);
    setUserChoices(prev => ({ ...prev, [scenario.id]: key }));
    setEvaluations(prev => ({ ...prev, [scenario.id]: evaluation }));

    if (evaluation.isBlancoCode) {
      soundscapes.playSanchoChime();
    }
  };

  const handleNext = () => {
    soundscapes.playPageTurn();
    if (currentScenarioIndex < PROTOCOL_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
    } else {
      setTestFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentScenarioIndex(0);
    setUserChoices({});
    setEvaluations({});
    setTestFinished(false);
  };

  // Calculate total score
  const totalScore = Object.values(evaluations).reduce((sum, ev) => sum + ev.score, 0);
  const maxScore = PROTOCOL_SCENARIOS.length * 10;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-sans font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Protocol Simulator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 dark:text-stone-100 tracking-tight">
          The Blanco Code: Field Stress Test
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-reading-serif leading-relaxed">
          Test your operational judgment against the real dilemmas of boutique transience. Will you maintain high protocol, fall into the amateur comparison trap, or mutate into a squatter?
        </p>
      </div>

      {!testFinished ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-stone-400 font-sans">
            <span>
              Scenario {currentScenarioIndex + 1} of {PROTOCOL_SCENARIOS.length}
            </span>
            <span className="font-semibold text-amber-800 dark:text-amber-400">
              Score: {totalScore} pts
            </span>
          </div>

          <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-600 h-full transition-all duration-300"
              style={{
                width: `${((currentScenarioIndex + 1) / PROTOCOL_SCENARIOS.length) * 100}%`,
              }}
            />
          </div>

          {/* Scenario Context */}
          <div className="space-y-3 pt-2">
            <div className="text-xs sm:text-sm font-sans text-stone-500 uppercase tracking-wider">
              {scenario.location}
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-stone-900 dark:text-stone-100">
              {scenario.title}
            </h2>
            <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 font-reading-serif leading-relaxed">
              {scenario.situation}
            </p>
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-sm sm:text-base italic text-amber-950 dark:text-amber-200 font-reading-serif leading-relaxed">
              “{scenario.context}”
            </div>
          </div>

          {/* Choices */}
          <div className="space-y-3 pt-2">
            <div className="text-xs sm:text-sm uppercase font-sans font-semibold text-stone-500">
              Select Your Protocol Response:
            </div>

            {scenario.choices.map(choice => {
              const selected = currentChoice === choice.key;
              return (
                <button
                  key={choice.key}
                  onClick={() => handleSelectChoice(choice.key)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all space-y-2 min-h-[64px] ${
                    selected
                      ? 'bg-amber-50 border-amber-500 dark:bg-amber-950/50 dark:border-amber-400 shadow-sm'
                      : 'bg-stone-50/50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-sans font-bold text-amber-900 dark:text-amber-300 uppercase">
                      Option {choice.key}
                    </span>
                    <span className="text-xs font-sans text-stone-400">
                      {choice.typeLabel}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-reading-serif text-stone-800 dark:text-stone-200 leading-relaxed">
                    {choice.text}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Evaluation Result Feedback */}
          {currentEvaluation && (
            <div
              className={`p-5 sm:p-6 rounded-2xl border space-y-2.5 transition-all ${
                currentEvaluation.isBlancoCode
                  ? 'bg-emerald-50/80 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                  : 'bg-rose-50/80 border-rose-300 dark:bg-rose-950/40 dark:border-rose-800 text-rose-950 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {currentEvaluation.isBlancoCode ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
                <span className="font-sans font-bold text-base">
                  {currentEvaluation.verdictTitle} ({currentEvaluation.score > 0 ? `+${currentEvaluation.score}` : currentEvaluation.score} pts)
                </span>
              </div>

              <p className="text-xs sm:text-sm font-sans font-semibold text-stone-600 dark:text-stone-400">
                Rule in play: {currentEvaluation.lawReferenced}
              </p>

              <p className="text-base font-reading-serif leading-relaxed">
                {currentEvaluation.feedback}
              </p>
            </div>
          )}

          {/* Next Button */}
          {currentEvaluation && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 text-base font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-sm min-h-[48px]"
              >
                <span>{currentScenarioIndex < PROTOCOL_SCENARIOS.length - 1 ? 'Next Scenario' : 'View Results'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results Card */
        <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-stone-400 font-sans font-semibold">
              Official Seminar Evaluation
            </div>
            <h2 className="text-3xl font-display font-bold text-stone-900 dark:text-stone-100">
              {totalScore === maxScore
                ? 'Certified Blanco Code Scholar'
                : totalScore >= 15
                ? 'Disciplined Guest in Training'
                : 'Amateur Squatter with Cologne'}
            </h2>
            <div className="text-2xl font-sans font-bold text-amber-800 dark:text-amber-400 tabular-nums">
              Score: {totalScore} / {maxScore} points
            </div>
          </div>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-reading-serif max-w-xl mx-auto leading-relaxed">
            {totalScore === maxScore
              ? '“¡JAJAJAJA! Impeccable. You know which chair is yours, you defended Daniel’s socket wrenches, and you left before the recycling was discussed. The University of Confidence is proud.”'
              : '“A noble attempt, caballero. But remember: a burnt sauce is not a coronation, and the King’s ego is not a piñata. Review the 7 Non-Negotiables before booking your next table at La Paloma.”'}
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 text-sm font-medium hover:bg-stone-800 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Field Test</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
