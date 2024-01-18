import geekVapeImage from '@/public/assets/images/mocks/geekvape.jpg';
import luxeTwoImage from '@/public/assets/images/mocks/luxe_2.jpg';
import AegisImage from '@/public/assets/images/mocks/aegis.jpg';
import deliriumImage from '@/public/assets/images/mocks/delirium.png';
import { Product } from '@/interfaces/interfaces';
export const productMock: Product[] = [
    {
        id: 1,
        name: 'GeekVape Aegis Legend 2',
        price: 70.99,
        image: geekVapeImage,
    },
    {
        id: 2,
        name: 'Vaporesso Luxe 2 II KIT',
        price: 80.99,
        image: luxeTwoImage,
    },
    {
        id: 3,
        name: 'GeekVape Aegis Mini 2',
        price: 60.99,
        image: AegisImage,
    },
    {
        id: 4,
        name: 'DELIRIUM PREMIUM E-LIQUID'.toLowerCase(),
        price: 15.99,
        image: deliriumImage,
    }
]