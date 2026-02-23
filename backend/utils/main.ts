const generateShareCode = (length: number = 6): string => {
    // Alphabet without confusing characters
    const alphabet = "2346789ABCDEFGHJKMNPQRTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += alphabet.charAt(
            Math.floor(Math.random() * alphabet.length)
        );
    }
    return result;
};

export { generateShareCode };
