export const processResponse = async (res) => {
    const json = await res.json();

    if (res.status >= 400) {
        const error = new Error(res.statusText);
        error.response = json;
        error.message = json.message;
        throw error;
    }

    return json.data;
};