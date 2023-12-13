import { useState } from "react";
import ContentBox from "../../components/elements/ContentBox";
import BoxModel from "../../components/elements/models/BoxModel";
import activity, { AdminActivity } from "../../axios/admin/activity";
import QueryModal from "../../components/elements/models/QueryModel";
import { differenceInHours, format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";

const AdminActivitys = () => {
	const [data, setData] = useState<AdminActivity[] | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleClick = () => {
		activity()
			.then((response) => {
				setData(response);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	if (!data) handleClick();

	return (
		<ContentBox title='Administração - Atividades do painel' nofooter={true}>
			<BoxModel
				title='Atividades do painel'
				desc='Informa os Atividades da administração do painel'
				onClick={handleClick}
				buttonSub='Refresh'
				search={searchTerm}
				setSearch={setSearchTerm}
			>
				<QueryModal data={data ?? []} search={searchTerm} limit={5}>
					{({ query }: { query: AdminActivity[] | undefined }) => (
						<>
							{query && query.sort((a, b) => {
								return b.create_at && a.create_at
									? new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
									: 0;
							}).map((activity, index) =>
							(<>
								<div key={index}
									className='rounded-lg overflow-hidden shadow-md bg-white bg-opacity-10 p-1 mb-1'
								>
									{activity.userid !== -1 && activity.userid !== -10 && <p className="text-base font-bold textsec">
										<i className="bx bx-user" />{" "}
										<Link to={`/admin/activity/${activity.userid}/view`} className="text-blue-500 hover:text-blue-800">
											{activity.username}
										</Link>{" "}
										- <small className="text text-xs">{activity.ip}</small>
									</p>}
									{activity.userid === -1 && <p className="text-base font-bold textsec">
										<i className="bx bx-user" />{" "}{activity.username+ " "} - <small className="text text-xs">{activity.ip}</small>
									</p>}
									{activity.userid === -10 && <p className="text-base font-bold textsec">
										<i className="bx bx-cog" />{" "}
										<Link to={`/admin/activity/system/view`} className="text-gray-500 hover:text-gray-400">
											{activity.username}
										</Link>{" "}
										- <small className="text text-xs">{activity.ip}</small>
									</p>}
									<p className='mb-1 textter font-bold text-xs '>
										<i className='bx bx-book-content' />{' '}<span>{activity.action}</span>
									</p>
									<p className='mb-1 text-sm textsec'><i className="bx bx-time" /> {' '}
										{activity.create_at
											? Math.abs(differenceInHours(new Date(activity.create_at), new Date())) > 48
												? format(new Date(activity.create_at), "'dia' d 'de' MMMM yyyy', ás' HH:mm", { locale: ptBR })
												: formatDistanceToNow(new Date(activity.create_at), { addSuffix: true, locale: ptBR })
											: 'desconhecido'}
									</p>
								</div>
							</>
							))}
						</>
					)}
				</QueryModal>
			</BoxModel>
		</ContentBox>
	);
};

export default AdminActivitys;
