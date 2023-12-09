// SeuComponente.tsx
import React from "react";
import styled from "styled-components";
import tw from "twin.macro"; // Importe o tw.macro

interface RowProps {
    bold?: boolean;
}

const Table = styled.div`
    ${tw`flex flex-col p-3 overflow-y-auto`}// Use o tw para aplicar estilos
`;
const Header = styled.div`
    ${tw`flex`}
`;
const Body = styled.div`
    ${tw`flex`}
`;
const Row = styled.div<RowProps>`
    ${tw`border border-solid border-gray-400 grow border-opacity-10`}
    font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const TableModal: React.FC = () => {
	return (
		<div>
			<Table>
				<Header className='corpri'>
					<Row>ID</Row>
					<Row>Email</Row>
					<Row>Nome</Row>
					<Row>Permissão</Row>
					<Row>Status</Row>
				</Header>
				<Body className='corpri'>
					<Row>1</Row>
					<Row>danielolxlol@gmassssssssssssssssil.com</Row>
					<Row>Daniel Oliveira</Row>
					<Row>10000</Row>
					<Row>Ativo</Row>
				</Body>
			</Table>
		</div>
	);
};

const SeuComponente: React.FC = () => {
	return (
		<>
			<TableModal />
			{/* Adicione outros componentes ou conteúdo conforme necessário */}
		</>
	);
};

export default SeuComponente;
