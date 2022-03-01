import { Question } from '../utils/types';

const lipsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
export const mockQuestions: Question[] = [
    {
        user: 'Александра',
        carBrand: 'Volkswagen',
        carModel: 'Polo IV',
        email: 'aleksandra@email.com',
        text: lipsum,
        date: '12.02.2020T21:13',
    },
    {
        user: 'Евгений',
        carBrand: 'Hyundai',
        carModel: 'Creta',
        email: 'eugene@email.com',
        text: lipsum,
        date: '12.02.2020T20:44',
    },
    {
        user: 'Павел',
        carBrand: 'Mitsubishi',
        carModel: 'Pajero',
        email: 'paul@email.com',
        text: lipsum,
        date: '11.02.2020T11:54',
    },
];
