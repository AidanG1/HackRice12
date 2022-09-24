import type { Button } from "$lib/Utils/types";
import { messages } from "$lib/Stores/stores";

type FlowStep = {
    text: string,
    buttons?: Button[]
}

export const flow: Record<number, FlowStep> =
{
    0: {
        text: 'Do you or anyone you know need immediate medical or psychiatric attention?',
        buttons: [
            {
                text: 'Yes',
                hyperlink: 'tel:988'
            },
            {
                text: 'No',
                user_send: 'No',
                next: 1
            }
        ]
    },
    1: {
        text: 'Do you want to make an appointment at an office?',
        buttons: [
            {
                text: 'Yes',
                user_send: 'Yes',
                next: 2
            },
            {
                text: 'No',
                user_send: 'No',
                next: 3
            }
        ]
    },
    2: {
        text: 'What type of concern are you experiencing?',
        buttons: [
            {
                text: 'Long-term distress',
                hyperlink: 'https://wellbeing.rice.edu/counseling-center/make-an-appointment',
            },
            {
                text: 'Short-term stress',
                hyperlink: 'https://calendly.com/d/cp5-ny5-6k3/wellbeing-advising-meeting',
            },
            {
                text: "I'm not sure",
                user_send: "I'm not sure",
                next: 4
            }
        ]
    },
    3: {
        text: 'What type of concern are you experiencing?',
        buttons: [
            {
                text: 'Long-term distress',
                user_send: 'Long-term distress',
                next: 6
            },
            {
                text: 'Short-term stress',
                user_send: 'Short-term stress',
                next: 7
            },
            {
                text: "Suicidal ideation",
                user_send: "Suicidal ideation",
                next: 8
            },
        ]
    },
    4: {
        text: 'What are you interested in?',
        buttons: [
            {
                text: 'Clinical services',
                hyperlink: 'https://wellbeing.rice.edu/',
            },
            {
                text: 'Wellbeing advising',
                hyperlink: 'https://wellbeing.rice.edu/',
            },
            {
                text: 'Not sure',
                hyperlink: 'https://wellbeing.rice.edu/',
            },
            {
                text: 'I want to chat anonymously with a mental health resource',
                user_send: 'Human',
                next: 5
            }
        ]
    },
    5: {
        text: 'Would you like to talk with a mental health professional or another student?',
        buttons: [
            {
                text: 'Mental health professional',
                user_send: 'Professional',
                next: 9
            },
            {
                text: 'Another student',
                user_send: 'Student',
                next: 10
            }
        ]
    },
    6: {
        text: 'Learn about clinical services',
        buttons: [
            {
                text: 'Learn more',
                hyperlink: 'https://wellbeing.rice.edu/counseling-center/our-services',
            },
        ]
    },
    7: {
        text: 'Learn about wellbeing services',
        buttons: [
            {
                text: 'Learn more',
                hyperlink: 'https://wellbeing.rice.edu/counseling-center/our-services',
            },
        ]
    },
    8: {
        text: 'Learn about crisis services',
        buttons: [
            {
                text: '24/7 Wellbeing',
                hyperlink: 'tel:7133483311',
            },
            {
                text: '24/7 Rice Police',
                hyperlink: 'tel:7133486000',
            },
            {
                text: '24/7 National',
                hyperlink: 'tel:911',
            }
        ]
    },
    9: {
        text: 'What type of concern are you experiencing?',
        buttons: [
            {
                text: 'Long-term distress',
                user_send: 'Long-term distress',
                next: 11
            },
            {
                text: 'Short-term stress',
                user_send: 'Short-term stress',
                next: 12
            },
        ]
    },
    10: {
        text: 'Is your concern:',
        buttons: [
            {
                text: 'LGBTQ+',
                user_send: 'LGBTQ+',
                next: 13
            },
            {
                text: "Women's Resource Center",
                user_send: 'Women',
                next: 14,
            },
            {
                text: 'Interpersonal violence',
                user_send: 'Interpersonal',
                next: 15,
            },
            {
                text: 'None of the above',
                user_send: 'None',
                next: 16
            }
        ]
    },
    11: {
        text: 'Direct to anonymous session with an affiliate from the counseling center'
    },
    12: {
        text: 'Direct to anonymous connection with an affiliate from the wellbeing center.'
    },
    13: {
        text: 'Ok, we are connecting you to a student affiliate from the Queer Resource Center.'
    }, 
    14: {
        text: "Ok, we are connecting you to a student affiliate from the Women's Resource Center."
    },
    15: {
        text: 'Ok, we are connecting you to a student affiliate from the SAFE office.'
    },
    16: {
        text: 'Ok, we are connecting you to a (RHA/STRIVE Liaison/etc.) affiliate.'
    }
}

export const send_flow = (step: number) => {
    messages.update((messages) => {
        messages.push({
            'sender': 'bot',
            'text': flow[step].text,
            'timestamp': new Date(),
            'buttons': flow[step].buttons
        })
        return messages
    })
}
