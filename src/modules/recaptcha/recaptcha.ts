import axios from 'axios';

const assessment = async (token: string, expectedAction: string) => {
    const siteKey = '6Lc5XbwgAAAAADVaT7MYYnvO029XjWMHl0RvJTIQ';
    const url =
        'https://recaptchaenterprise.googleapis.com/v1/projects/sattamini/assessments?key=AIzaSyDdBwoc9-kAEs0actllFQNJEcxYBRGhlvQ';
    const body = {
        event: {
            token,
            siteKey,
            expectedAction,
        },
    };
    return await axios.post(url, body);
};

export default assessment;
