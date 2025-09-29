import React, { useState } from 'react';
import { Question } from '../types';

interface QuestionModalProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ question, onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const handleSelect = (option: string) => {
        if(selectedAnswer) return;
        setSelectedAnswer(option);
        setTimeout(() => {
            onAnswer(option === question.correctAnswer);
        }, 1500);
    }

    const getButtonClass = (option: string) => {
        if (!selectedAnswer) return "bg-cyan-600 hover:bg-cyan-500";
        if (option === question.correctAnswer) return "bg-green-500";
        if (option === selectedAnswer && option !== question.correctAnswer) return "bg-red-500";
        return "bg-gray-700 opacity-50";
    };

    return (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-2xl p-6 border border-cyan-500 shadow-2xl">
                <img src={question.imageUrl} alt="Imagem da questão" className="w-full h-64 object-contain rounded-lg mb-4" />
                <h2 className="text-2xl text-center font-bold mb-6">{question.question}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map(option => (
                        <button
                            key={option}
                            onClick={() => handleSelect(option)}
                            disabled={!!selectedAnswer}
                            className={`p-4 rounded-lg text-white font-bold text-lg transition-colors ${getButtonClass(option)}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionModal;
