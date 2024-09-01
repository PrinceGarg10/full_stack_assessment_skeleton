
import React, { useState, useEffect } from 'react';
import HomeCard from './HomeCard';
import UserHomeModel from './HomeUserModel';
import { useSelector } from 'react-redux';
import { useGetHomeByUserQuery } from '../services/apislice';
import EmptyState from './EmptyState';
import ErrorDisplay from './Error';
import Skeleton from 'react-loading-skeleton';
import Pagination from './Pagination';

const UserHomeList = () => {
    const selectedUser = useSelector((state) => state.selectedUser.user);
    const [isRetryLoading, setIsRetryLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const { data, error, isLoading, refetch } = useGetHomeByUserQuery({
        userId: selectedUser?.id,
        page,
    }, {
        skip: !selectedUser,
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        if (selectedUser) {
            refetch();
        }
    }, [selectedUser, refetch, page]);

    // Sample data for demonstration

    const handleEditClick = (cardId) => {
        // Find the card data by id and set it to modalData
        const cardData = cards.find(card => card.id === cardId);
        setModalData(cardData);
        setSelectedCardId(cardId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCardId(null);
        setModalData(null);
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

    const handleSave = (selectedUser) => {
        console.log('User selected:', selectedUser);
        // Implement save logic
        handleCloseModal();
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
                                            onEditClick={() => handleEditClick(card.id)}
                                        />
                                    )
                                })}
                            </div>
                            <Pagination currentPage={Number(page)} totalPages={Number(Math.ceil(data.total / data.limit))} onPageChange={setPage} />

                        </div>
                        : <EmptyState />
            }
            {modalOpen && (
                <UserHomeModel
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    homeId={selectedCardId}
                    data={modalData}
                />
            )}
        </div>
    );
};

export default UserHomeList;
