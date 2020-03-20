import React, { useState } from 'react';
import { Stepper, Step, StepLabel, StepContent, Button, makeStyles, Theme, Paper, Typography } from '@material-ui/core';
import Dropzone from './Dropzone/Dropzone';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
const classNames = require('classnames');

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(2)
    },
    startButton: {
        boxShadow: theme.shadows[12],
        width: '100%',
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        background: `linear-gradient(45deg, ${theme.palette.secondary.light} 30%, #FF8E53 90%)`
    },
    actionsContainer: {
        marginBottom: theme.spacing(2)
    },
    resetContainer: {
        padding: theme.spacing(2)
    }
}));

function getSteps() {
    return ['Prepare .rgt files', 'Upload .pdf files', 'Check out'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return `Select your .rgt files here`;
        case 1:
            return (<Dropzone />);
        case 2:
            return `Before you can start, just make sure that the following information is correct:...`;
        default:
            return `An error occurred, please try again later`;
    }
}

export default function RegSheetsStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const steps = getSteps();

    const isStepOptional = (step: number) => {
        return step === 0;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    }

    const handleNext = () => {
        if (isStepSkipped(activeStep)) {
            const newSkipped = new Set(skipped.values());
            newSkipped.delete(activeStep);
            setSkipped(newSkipped);
        }
        setActiveStep(prevStep => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevStep => prevStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that is NOT optional.");
        }
        setActiveStep(prevStep => prevStep + 1);
        setSkipped(prevSkipped => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {
                    steps.map((label: string, i: number) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: { optional?: React.ReactNode } = {};
                        if (isStepOptional(i)) {
                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        }
                        if (isStepSkipped(i)) {
                            stepProps.completed = false;
                        }

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                                <StepContent>
                                    {getStepContent(i)}
                                    <div className={classes.actionsContainer}>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                        {isStepOptional(i) && (
                                            <Button
                                                color="primary"
                                                onClick={handleSkip}
                                                className={classes.button}
                                            >
                                                Skip
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })
                }
            </Stepper>
            <div>
                {activeStep === steps.length && (
                    <Paper elevation={0} className={classes.resetContainer}>
                        <Typography>Yeah, you're now ready for take-off.</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            centerRipple
                            className={classNames(classes.button, classes.startButton)}
                            endIcon={<PlayCircleFilledWhiteIcon />}>
                            Start Reg-Sheets-Viewer
                        </Button>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </div>
        </div>
    );
};
