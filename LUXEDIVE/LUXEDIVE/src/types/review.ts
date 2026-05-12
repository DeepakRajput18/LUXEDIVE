
// Type definitions for Chauffeur Reviews
export interface ChauffeurReview {
    id: string;
    chauffeurId: number;
    bookingId: string;
    userId: string;
    userFirstName: string;
    rating: number; // 1 to 5
    title?: string;
    comment: string;
    createdAt: string; // ISO timestamp
    tripDate: string; // ISO timestamp or date string
    carName: string;
    isVerifiedRide: boolean;
    moderationStatus: 'pending' | 'approved' | 'rejected';
}

export const MOCK_REVIEWS: ChauffeurReview[] = [
    {
        id: 'rev_001',
        chauffeurId: 1, // Rajesh
        bookingId: 'bk_123',
        userId: 'u_01',
        userFirstName: 'Rohit',
        rating: 5,
        title: 'Exceptional Service',
        comment: 'Rajesh was incredibly professional. Arrived 15 minutes early and knew the best route to the airport during rush hour. The Rolls Royce was pristine.',
        createdAt: '2026-02-15T10:00:00Z',
        tripDate: '2026-02-14T18:30:00Z',
        carName: 'Rolls Royce Ghost',
        isVerifiedRide: true,
        moderationStatus: 'approved'
    },
    {
        id: 'rev_002',
        chauffeurId: 1, // Rajesh
        bookingId: 'bk_124',
        userId: 'u_02',
        userFirstName: 'Sarah',
        rating: 5,
        title: 'Felt very safe',
        comment: 'As a solo female traveler, safety is my priority. Rajesh made me feel completely at ease. Highly recommend.',
        createdAt: '2026-02-10T09:00:00Z',
        tripDate: '2026-02-09T20:00:00Z',
        carName: 'Mercedes S-Class',
        isVerifiedRide: true,
        moderationStatus: 'approved'
    },
    {
        id: 'rev_003',
        chauffeurId: 3, // Anil
        bookingId: 'bk_125',
        userId: 'u_03',
        userFirstName: 'Mike',
        rating: 5,
        title: 'Best guide in town',
        comment: 'Anil is more than a driver; he is an excellent guide. Showing us the hidden gems of Ahmedabad was a highlight of our trip.',
        createdAt: '2026-02-12T14:30:00Z',
        tripDate: '2026-02-11T10:00:00Z',
        carName: 'BMW 7 Series',
        isVerifiedRide: true,
        moderationStatus: 'approved'
    }
];

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};
