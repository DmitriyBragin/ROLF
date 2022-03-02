import './index.scss';
import { Question } from '../../utils/types';

export const CarQuestion = ({ question }: { question: Question }) => {
    const transformDate = (): string => {
        if (!question.date) return 'N/A';
        return question.date.split('T').join(' в ');
    };

    return question ? (
        <div className="car-question">
            <div className="car-question__header">
                <div className="car-question__header_name">{question.user}</div>
                <div className="car-question__header_car">
                    {question.carBrand} {question.carModel}
                </div>
            </div>
            <div className="car-question__time">{transformDate()}</div>
            <div className="car-question__text">{question.text}</div>
        </div>
    ) : (
        <></>
    );
};
