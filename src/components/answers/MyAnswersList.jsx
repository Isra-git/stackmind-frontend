/* 


Subcomponente de MY Answers


*/
// src/components/answers/MyAnswersList.jsx
import React from "react";
import { MyAnswerItem } from "./MyAnswersItem";

export const MyAnswersList = ({ answers }) => {
  if (!answers || answers.length === 0) {
    return (
      <div className="text-center py-12 bg-base-200 rounded-box border border-base-300 border-dashed">
        <span className="text-4xl mb-4 block">💬</span>
        <h3 className="text-lg font-bold opacity-70">
          Aún no has respondido a ninguna pregunta.
        </h3>
        <p className="text-sm opacity-50 mt-2">
          ¡Anímate a compartir tu conocimiento con la comunidad!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {answers.map((answer) => (
        <MyAnswerItem key={answer.id || answer._id} answer={answer} />
      ))}
    </div>
  );
};
