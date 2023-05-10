export const formatDate = (createdAt: Date) => {
	const date = new Date(createdAt);
	const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
	return `Adicionado em ${formattedDate}`;
};
