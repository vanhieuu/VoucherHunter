export enum PaymentStatus {
  pending = 1,
  cancel = 2,
  done = 3,
}

export interface InvoiceProps {
  _id: string;
  products: [
    {
      _id: string;
      listPrice: number;
      discountPrice: number;
      quantity: number;
    },
  ];
  totalListPrice: number;
  totalDiscountPrice: number;
  paymentMethod: 'COD' | 'VISA';
  paymentStatus: PaymentStatus;
  status: PaymentStatus.pending;
  deliveryAddress: '{"number":"23 ngách 17/2","city":"Hà Nội","street":"Nguyễn Văn Lộc"}';
  note: string;
  createdAt: string;
  __v: 0;
}
interface TreeRoot {
  data:[
    {
      _id: string;
      products: [
        {
          _id: string;
          listPrice: number;
          discountPrice: number;
          quantity: number;
        },
      ];
      totalListPrice: number;
      totalDiscountPrice: number;
      paymentMethod: 'COD' | 'VISA';
      paymentStatus: PaymentStatus;
      status: PaymentStatus.pending;
      deliveryAddress: '{"number":"23 ngách 17/2","city":"Hà Nội","street":"Nguyễn Văn Lộc"}';
      note: string;
      createdAt: string;
      __v: 0;
    }
  ]
}