
export const formatSalary = (salary: number): string => {
    return `$${salary.toLocaleString('en-US')}`;
};
