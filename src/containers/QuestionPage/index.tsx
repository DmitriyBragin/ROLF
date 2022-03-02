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
    const [isStartLoading, setIsStartLoading] = useState<boolean>(true);
    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    useEffect(() => {
        QuestionService.getQuestions().then(resp => {
            if ((resp as FetchError).error) {
                return;
            }
            setQuestions(resp as Question[]);
            setIsStartLoading(false);
        });
    }, []);

    const submitQuestion = (q: Question): void => {
        setIsSubmitLoading(true);
        QuestionService.submitQuestion(q).then(resp => {
            if ((resp as FetchError).error) {
                setIsSubmitLoading(false);
                return;
            }
            setQuestions(old => [...old, q]);
            setIsSubmitLoading(false);
        });
    };

    return (
        <div className="question-page">
            {isStartLoading ? (
                <Oval color={'#1940FF'} height={80} width={80} />
            ) : (
                <div className="question-page__questions">
                    {questions.map(el => (
                        <CarQuestion question={el} />
                    ))}
                </div>
            )}
            <SubmitQuestionForm cb={submitQuestion} isSubmitLoading={isSubmitLoading} />
        </div>
    );
};
