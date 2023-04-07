enum TransportationType {
  Flight,
  Land,
}

// enum AdvertisingStatus {
//   "Flight",
//   "Land",
// }
export { TransportationType };
export const TransportationTypeList: { id: number; name: string }[] = [];

for (var n in TransportationType) {
  if (typeof TransportationType[n] === 'number') {
    TransportationTypeList.push({ id: <any>TransportationType[n], name: n });
  }
}
