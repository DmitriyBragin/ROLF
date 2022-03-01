import './index.scss';
import { RouteComponentProps } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FetchError, Question } from '../../utils/types';
import { Oval } from 'react-loader-spinner';
import { SubmitQuestionForm } from '../../components/SubmitQuestionForm';
import QuestionService from '../../services/QuestionService';
import { CarQuestion } from '../../components/CarQuestion';

export const QuestionPage = (props: RouteComponentProps<any>) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        QuestionService.getQuestions().then(resp => {
            if ((resp as FetchError).error) {
                return;
            }
            setQuestions(resp as Question[]);
            setIsLoading(false);
        });
    }, []);

    const submitQuestion = (q: Question): void => {
        setIsLoading(true);
        QuestionService.submitQuestion(q).then(resp => {
            if ((resp as FetchError).error) {
                setIsLoading(false);
                return;
            }
            setQuestions(old => [...old, q]);
            setIsLoading(false);
        });
    };

    return (
        <div className="question-page">
            {isLoading ? (
                <Oval color={'#1940FF'} height={80} width={80} />
            ) : (
                <div className="question-page__questions">
                    {questions.map(el => (
                        <CarQuestion question={el} />
                    ))}
                </div>
            )}
            <SubmitQuestionForm cb={submitQuestion} />
        </div>
    );
};
