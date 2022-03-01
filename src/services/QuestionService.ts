import BaseService from './BaseService';
import { FetchError, Question } from '../utils/types';
import { mockQuestions } from './mockup';

/* TEMP */
const asyncGetQuestionsMock = () => {
    return new Promise<Question[] | FetchError>((resolve, reject) => {
        setTimeout(() => {
            resolve(mockQuestions);
        }, 1300);
    });
};
/* TEMP */

export default class QuestionService extends BaseService {
    static async getQuestions(): Promise<Question[] | FetchError> {
        const options: RequestInit = {
            method: 'GET',
        };
        //return await this.request(`${process.env.REACT_APP_API_QUESTIONS_BASE}/get`, options);
        return await asyncGetQuestionsMock();
    }

    static async submitQuestion(question: Question): Promise<Response | FetchError> {
        const options = {
            method: 'POST',
            body: JSON.stringify(question),
        };
        return await this.request(`${process.env.REACT_APP_API_QUESTIONS_BASE}/post`, options);
    }
}
