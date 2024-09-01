
import React, { useState, useEffect } from 'react';
import HomeCard from './HomeCard';
import UserHomeModel from './HomeUserModel';
import { useSelector } from 'react-redux';
import { useGetHomeByUserQuery, useGetUserByHomeQuery, useUpdateUserInHomeMutation } from '../services/apislice';
import EmptyState from './EmptyState';
import ErrorDisplay from './Error';
import Skeleton from 'react-loading-skeleton';
import Pagination from './Pagination';

const UserHomeList = () => {
    const selectedUser = useSelector((state) => state.selectedUser.user);
    const [isRetryLoading, setIsRetryLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [page, setPage] = useState(1)
    const [selectedHome, setSelectedHome] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);

    const { data, error, isLoading, refetch } = useGetHomeByUserQuery({
        userId: selectedUser?.id,
        page,
    }, {
        skip: !selectedUser,
        refetchOnMountOrArgChange: true
    });

    const { data: homeUser, refetch: homeUserRefetch } = useGetUserByHomeQuery({ homeId: selectedHome?.id }, {
        skip: !selectedHome,
        refetchOnMountOrArgChange: true
    });

    const [updateUserInHome, { data: updateUser, error: userUpdateError, isLoading: updateUserLoading }] = useUpdateUserInHomeMutation();

    useEffect(() => {
        if (selectedHome) {
            homeUserRefetch()
        }
    }, [selectedHome])

    useEffect(() => {
        if (selectedUser) {
            refetch();
        }
    }, [selectedUser, refetch, page]);

    const handleEditClick = (home) => {
        setSelectedHome(home);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleRefetch = async () => {
        setIsRetryLoading(true);
        try {
            await refetch().unwrap();
        } catch (err) {
            console.log(err);
        } finally {
            setIsRetryLoading(false);
        }
    };

    useEffect(() => {
        if (!updateUserLoading) {
            handleCloseModal()
        }
        if(userUpdateError) {
            alert(userUpdateError.error || userUpdateError.data?.errorMessage)
        }

    }, [updateUserLoading, userUpdateError])

    const handleSave = (selectedUser) => {
        updateUserInHome({ homeId: selectedHome?.id, userIds: selectedUsers })

    };

    return (
        <div className="p-4">
            {isLoading || isRetryLoading ? <div className='w-40'> <Skeleton count={10} /></div> :
                error ? <ErrorDisplay error={error.error || error.data?.errorMessage} onRetry={handleRefetch} />
                    :
                    data?.data && data.data.length ?
                        <div>
                            <div className="flex flex-wrap gap-4">
                                {data?.data?.map(card => {
                                    return (
                                        <HomeCard
                                            key={card.id}
                                            header={card.street_address}
                                            data={card}
                                            handleEditClick={() => handleEditClick(card)}
                                        />
                                    )
                                })}
                            </div>
                            <Pagination currentPage={Number(page)} totalPages={Number(Math.ceil(data.total / data.limit))} onPageChange={setPage} />

                        </div>
                        : <EmptyState />
            }
            {(modalOpen) && (
                <UserHomeModel
                    isOpen={modalOpen}
                    homeStreet={selectedHome.street_address}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    error={userUpdateError}
                    isLoading={updateUserLoading}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                    users={homeUser}
                />
            )}
        </div>
    );
};

export default UserHomeList;
