import { Customer } from "@/types/customers";
import jsPDF from "jspdf";
import { formatDate } from "./formatDate";

export const downloadReport = async (customer: Customer) => {
	const doc = new jsPDF();

	const styles = {
		title: {
			fontSize: 20,
			fontWeight: "bold",
			margin: { top: 10 },
		},
		subtitle: {
			fontSize: 16,
			fontWeight: "bold",
			textDecoration: "underline",
			margin: { top: 10 },
		},
		text: {
			fontSize: 14,
			margin: { top: 5 },
		},
	};

	doc.setFontSize(styles.title.fontSize);
	doc.setFont("", styles.title.fontWeight);
	doc.text(`Relatório do Cliente`, 10, 10);

	doc.setFontSize(styles.subtitle.fontSize);
	doc.setFont("", styles.subtitle.fontWeight);
	doc.setDrawColor(0, 0, 0);
	doc.setLineWidth(0.1);
	doc.line(10, 22, 80, 22);
	doc.text("Cliente:", 10, 20);

	doc.setFontSize(styles.text.fontSize);
	doc.setFont("", "normal");
	doc.text(`Nome: ${customer.name}`, 10, 30);
	doc.text(`E-mail: ${customer.email}`, 10, 40);
	doc.text(`Telefone: ${customer.phone}`, 10, 50);
	doc.text(`Adicionado em: ${formatDate(customer.createdAt)}`, 10, 60);

	doc.setFontSize(styles.subtitle.fontSize);
	doc.setFont("", styles.subtitle.fontWeight);
	doc.setDrawColor(0, 0, 0);
	doc.setLineWidth(0.1);
	doc.line(10, 72, 72, 72);
	doc.text("Contatos:", 10, 70);

	if (customer.contacts) {
		customer.contacts.forEach((contato, index) => {
			const y = 80 + index * 30;
			doc.setFontSize(styles.text.fontSize);
			doc.setFont("", "normal");
			doc.text(`${index + 1}. Nome: ${contato.name}`, 10, y);
			doc.text(`    E-mail: ${contato.email}`, 10, y + 7);
			doc.text(`    Telefone: ${contato.phone}`, 10, y + 14);
			doc.text(`    ${formatDate(contato.createdAt)}`, 10, y + 21);
		});
	}

	doc.save(`relatorio_${customer.name.replace(/\s/g, "_")}.pdf`);
};
