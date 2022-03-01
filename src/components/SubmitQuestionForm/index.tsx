import './index.scss';
import { Question } from '../../utils/types';
import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getEmptyQuestionObject, isFilled, preparePayload, validateForm } from './helpers';

export const SubmitQuestionForm = ({ cb }: { cb: (q: Question) => void }) => {
    const [formErrors, setFormErrors] = useState<Question>(getEmptyQuestionObject());
    const [data, setData] = useState<Question>(getEmptyQuestionObject());
    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    const handleChange = (evt: { target: any }) => {
        setData({
            ...data,
            [evt.target.name]: evt.target.value,
        });
    };

    useEffect(() => {
        setCanSubmit(isFilled(data));
    }, [JSON.stringify(data)]);

    const cleanupData = (): void => {
        setData(getEmptyQuestionObject());
        setFormErrors(getEmptyQuestionObject());
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { isValid, errors } = validateForm(data);
        setFormErrors(errors);
        if (isValid) {
            const payload: Question = preparePayload(data);
            cleanupData();
            cb(payload);
        }
    };

    return (
        <div className="submit-question-form">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="user"
                            required
                            fullWidth
                            id="user"
                            label="Имя"
                            value={data.user}
                            onChange={handleChange}
                            error={!!formErrors.user.length}
                            helperText={formErrors.user}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            value={data.email}
                            error={!!formErrors.email.length}
                            helperText={formErrors.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="carBrand"
                            label="Марка авто"
                            name="carBrand"
                            value={data.carBrand}
                            error={!!formErrors.carBrand.length}
                            helperText={formErrors.carBrand}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="carModel"
                            label="Модель авто"
                            name="carModel"
                            value={data.carModel}
                            error={!!formErrors.carModel.length}
                            helperText={formErrors.carModel}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            required
                            fullWidth
                            name="text"
                            label="Введите текст вопроса"
                            type="text"
                            id="text"
                            value={data.text}
                            inputProps={{ maxLength: 500 }}
                            error={!!formErrors.text.length}
                            helperText={`${formErrors.text} ${data.text.length}/500`}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!canSubmit}>
                    Отправить
                </Button>
            </Box>
        </div>
    );
};
