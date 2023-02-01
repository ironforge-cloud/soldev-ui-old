export const truncateText = (input, length) => {
    if (!input) return '';
    return input.length > length ? `${input.substring(0, length)}...` : input;
};

export const getAuthorHeadings = (author) => {
    const regex1 = /(<(.*?)>|\((.*?)\))/g;

    if (author.match(regex1)) {
        return author.match(regex1).map((match) => {
            const heading = author.replace(match, '').trim();
            const subheading = match.replace('<' && '(', '').replace('>' && ')', '');


            return {
                heading,
                subheading,
            };
        });
    }

    return [];
};