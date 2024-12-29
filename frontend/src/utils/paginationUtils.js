export const calculatePageGroups = (currentPage, totalPages, pageGroupSize) => {
    const pageGroup = Math.floor((currentPage - 1) / pageGroupSize);
    const startPage = pageGroup * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

    return { startPage, endPage, pageGroup };
};
