import { Question } from './types';

// Fix: Renamed geographyQuestions to predefinedQuestions and added x/y coordinates.
export const predefinedQuestions: Question[] = [
  {
    question: "Qual é a capital da Austrália?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra",
    imageUrl: "https://images.unsplash.com/photo-1506973035872-942150444d59?q=80&w=800",
    x: 15,
    y: 80,
  },
  {
    question: "Qual rio é o mais longo do mundo?",
    options: ["Nilo", "Amazonas", "Yangtzé", "Mississippi"],
    correctAnswer: "Amazonas",
    imageUrl: "https://images.unsplash.com/photo-1554159584-07452367a42c?q=80&w=800",
    x: 35,
    y: 75,
  },
  {
    question: "Qual é o maior deserto do mundo?",
    options: ["Saara", "Arábico", "Gobi", "Antártida"],
    correctAnswer: "Antártida",
    imageUrl: "https://images.unsplash.com/photo-1549929884-3c66f2a89c06?q=80&w=800",
    x: 50,
    y: 60,
  },
  {
    question: "Em que país se encontra a Grande Muralha?",
    options: ["Japão", "Índia", "China", "Mongólia"],
    correctAnswer: "China",
    imageUrl: "https://images.unsplash.com/photo-1543653844-93448f8352ce?q=80&w=800",
    x: 30,
    y: 45,
  },
  {
    question: "Qual o ponto mais alto da Terra?",
    options: ["Monte Everest", "K2", "Kangchenjunga", "Lhotse"],
    correctAnswer: "Monte Everest",
    imageUrl: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800",
    x: 55,
    y: 30,
  },
  {
    question: "Qual país é conhecido como a 'Terra do Sol Nascente'?",
    options: ["Coreia do Sul", "Japão", "Vietnã", "Filipinas"],
    correctAnswer: "Japão",
    imageUrl: "https://images.unsplash.com/photo-1526481280643-3b94098b0b41?q=80&w=800",
    x: 80,
    y: 20,
  },
];
