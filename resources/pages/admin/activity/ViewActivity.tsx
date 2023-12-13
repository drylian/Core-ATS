import { useState } from "react";
import ContentBox from "../../../components/elements/ContentBox";
import BoxModel from "../../../components/elements/models/BoxModel";
import activity, { AdminActivity } from "../../../axios/admin/activity";
import QueryModal from "../../../components/elements/models/QueryModel";
import { differenceInHours, format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link, useParams } from "react-router-dom";
import AdminMissing from "../../errors/admin/AdminMissing";
import { UserE } from "../../../states/admin/account";
import getAccount from "../../../axios/admin/accounts/getAccount";

const ViewActivity = () => {
    const [data, setData] = useState<AdminActivity[] | null>(null);
    const [user, setUser] = useState<UserE | null>(null);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const { id } = useParams();
    if (!id) {
        return <AdminMissing />;
    }

    const handleClick = () => {
        activity(id)
            .then((response) => {
                setData(response);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const getUser = () => {
        getAccount(id).then((response) => {
            setUser(response);
        })
            .catch((err) => {
                console.error(err);
            });
    }


    if (!data) handleClick();
    if (id && id !== "system" && !user) getUser()

    return (
        <ContentBox title={`Administração - Atividades - ${id !== "system" ? id : "Sistema"}`} nofooter={true}>
            <div className="flex flex-col sm:flex-row p-3 overflow-y-auto">
                {user ? (
                    <BoxModel className="p-1" noheader nopad>
                        <>
                            <div className="p-3 rounded shadow-md">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 flex items-center justify-center border-4 border-blue-500 rounded-full">
                                        <i className="bx bx-user" style={{ fontSize: '50px' }} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold textpri">
                                            <strong>Usuário:</strong> {user?.username ?? 'N/A'}
                                        </p>
                                        <p className="text-sm textsec">
                                            <strong>E-mail:</strong> {user.email}
                                        </p>
                                        <p className="text-xs textter">
                                            <strong>Rank de permissão:</strong> {user.permissions ?? 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs textter">
                                        <strong>Idioma:</strong> {user.lang ?? 'N/A'}
                                    </p>
                                    <p className="text-xs textter">
                                        <strong>Status:</strong> {user.suspended ? 'Suspenso' : 'Normal'}
                                    </p>
                                    {user.suspended && (
                                        <p>
                                            <strong>Suspended Reason:</strong> {user.suspendedReason ?? 'N/A'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    </BoxModel>
                ) : null}
                <BoxModel
                    search={searchTerm}
                    setSearch={setSearchTerm}
                    className="p-1 flex-1"
                    desc={id === "system" ? "Registros de atividades do sistema" : ""}
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
                                            <Link to={`/admin/accounts/${activity.userid}/edit`} className="text-blue-500 hover:text-blue-800">
                                                {activity.username}
                                            </Link>{" "}
                                            - <small className="text text-xs">{activity.ip}</small>
                                        </p>}
                                        {activity.userid === -1 && <p className="text-base font-bold textsec">
                                            <i className="bx bx-user" />{" "}{activity.username + " "} - <small className="text text-xs">{activity.ip}</small>
                                        </p>}
                                        {activity.userid === -10 && <p className="text-base font-bold textsec">
                                            <i className="bx bx-cog" />{" "}{activity.username + " - "}
                                            <small className="text text-xs">{activity.ip}</small>
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
            </div>
        </ContentBox>
    );
};

export default ViewActivity;
