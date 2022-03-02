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

const mapQuestionToApi = (q: Question): Question => {
    return {
        text: q.text,
        email: q.email,
        carModel: q.carModel,
        user: q.user,
        carBrand: q.carBrand,
    };
};

export default class QuestionService extends BaseService {
    static async getQuestions(): Promise<Question[] | FetchError> {
        const options: RequestInit = {
            method: 'GET',
        };
        //return await this.request(`${process.env.REACT_APP_API_QUESTIONS_BASE}/get`, options);
        return await asyncGetQuestionsMock();
    }

    static async submitQuestion(question: Question): Promise<Response | FetchError> {
        const payload = mapQuestionToApi(question);
        const options = {
            method: 'POST',
            body: JSON.stringify(payload),
        };
        return await this.request(`${process.env.REACT_APP_API_QUESTIONS_BASE}/post`, options);
    }
}
