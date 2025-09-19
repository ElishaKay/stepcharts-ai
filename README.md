The svg-api is actually already public, if you send a properly-structured request, you'll get back SVG. 

I'm providing the information below, which I hope is sufficient for you to experiment with. 

Please let me know if you have any questions. Thank you!

BB

The URL for the POST request is: https://svg-api.stepcharts.io/svg

Sample Data (raw JSON for the body of the request):

{
  "type": "snapshot",
  "snapshot": {
    "actors": [
      {
        "type": "Company",
        "id": "1657159247393",
        "name": "HoldCo 1 LLC",
        "legalStatuses": [
          {
            "label": "California LLC",
            "jurisdictionCode": "US-CA"
          }
        ]
      },
      {
        "type": "Trust",
        "id": "1657159327094",
        "name": "Family Trust",
        "legalStatuses": [
          {
            "label": "Florida Trust",
            "jurisdictionCode": "US-FL"
          }
        ]
      },
      {
        "type": "Company",
        "id": "1657160090833",
        "name": "Sub 15 S.A.",
        "legalStatuses": [
          {
            "label": "Panamanian SA",
            "jurisdictionCode": "PA"
          }
        ]
      },
      {
        "type": "Company",
        "id": "1657160190727",
        "name": "Sub 20 SAS",
        "legalStatuses": [
          {
            "label": "Colombian SAS",
            "jurisdictionCode": "CO"
          }
        ]
      },
      {
        "type": "Company",
        "id": "1657160439324",
        "name": "Sub 17 S.A.",
        "legalStatuses": [
          {
            "label": "Panamanian SA",
            "jurisdictionCode": "PA"
          }
        ]
      }
    ],
    "ownershipRecords": [
      {
        "ownerId": "1657159327094",
        "ownerName": "Family Trust",
        "propertyId": "1657159247393",
        "amount": 25,
        "unit": "%"
      },
      {
        "ownerId": "1657159247393",
        "ownerName": "HoldCo 1 LLC",
        "propertyId": "1657160090833",
        "amount": 26,
        "unit": "%"
      },
      {
        "ownerId": "1657160090833",
        "ownerName": "Sub 15 S.A.",
        "propertyId": "1657160190727",
        "amount": 98.7,
        "unit": "%"
      },
      {
        "ownerId": "1657160090833",
        "ownerName": "Sub 15 S.A.",
        "propertyId": "1657160439324",
        "amount": 97.5,
        "unit": "%"
      }
    ]
  }
}

Here are trimmed down TS interfaces for your initial use (the API supports many more parameters, but I think this is a good sample to start with):
export interface RequestBody {
    type: 'snapshot';
    snapshot: Snapshot;
}
export interface Snapshot {
  actors?: ActorSnapshot[];
  ownershipRecords?: OwnershipSnapshot[];
}
export interface ActorSnapshot {
  type: 'Person' | 'Company' | 'Partnership' | 'Trust',
  id: string;
  name: string;
  legalStatuses?: {
    label: string;
    jurisdictionCode: string;
  }[];
}
export interface OwnershipSnapshot {
    ownerId: string;
    ownerName: string;
    propertyId: string;
    amount: number;
    unit: string;
}