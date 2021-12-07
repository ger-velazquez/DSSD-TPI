import { SocietyRegistrationPendingFormsResponse } from "../interfaces/SocietyRegistrationInterfaces";

export const mockSocieties = [
  {
    "id": 2,
    "due_date": null,
    "observation": null,
    "file_number": null,
    "hash": null,
    "date_created": "2021-10-13",
    "anonymous_society": {
      "name": "Una SA",
      "date_created": "2021-10-02",
      "statute": "http://app.bonita.com:8000/uploads/statute_djragfi.pdf",
      "real_address": "dom real",
      "legal_address": "dom legal",
      "email": "asd@gmail.com",
      "legal_representative": {
        "id": 3,
        "name": "asda",
        "last_name": "test",
        "percentage": 5,
        "society_registration": 2
      },
      "export": [
        {
          "state": "(?",
          "country": {
            "id": 1,
            "name": "Algeria"
          }
        }
      ]
    },
    "status": {
      "id": 1,
      "name": "Pending"
    },
    "qr": null,
    "associate": [
      {
        "id": 3,
        "name": "asda",
        "last_name": "test",
        "percentage": 5,
        "society_registration": 2
      },
      {
        "id": 2,
        "name": "asda",
        "last_name": "asdasd",
        "percentage": 20,
        "society_registration": 2
      }
    ]
  },
  {
    "id": 3,
    "due_date": null,
    "observation": null,
    "file_number": null,
    "hash": null,
    "date_created": "2021-10-13",
    "anonymous_society": {
      "name": "Coca Cola",
      "date_created": "2021-10-24",
      "statute": "http://app.bonita.com:8000/uploads/statute_pj2OKbo.pdf",
      "real_address": "Un domicilio real",
      "legal_address": "Un domicilio legal",
      "email": "cocacola@gmail.com",
      "legal_representative": {
        "id": 5,
        "name": "Nico",
        "last_name": "Poya",
        "percentage": 20,
        "society_registration": 3
      },
      "export": [
        {
          "state": "Que onda",
          "country": {
            "id": 1,
            "name": "Algeria"
          }
        },
        {
          "state": "Test",
          "country": {
            "id": 2,
            "name": "American Samoa"
          }
        }
      ]
    },
    "status": {
      "id": 1,
      "name": "Pending"
    },
    "qr": null,
    "associate": [
      {
        "id": 6,
        "name": "Ger",
        "last_name": "Vel",
        "percentage": 10,
        "society_registration": 3
      },
      {
        "id": 5,
        "name": "Nico",
        "last_name": "Poya",
        "percentage": 20,
        "society_registration": 3
      },
      {
        "id": 4,
        "name": "Tomi",
        "last_name": "Facu",
        "percentage": 52,
        "society_registration": 3
      }
    ]
  },
  {
    "id": 4,
    "due_date": null,
    "observation": null,
    "file_number": null,
    "hash": null,
    "date_created": "2021-10-14",
    "anonymous_society": {
      "name": "asdsada",
      "date_created": "2021-10-01",
      "statute": "http://app.bonita.com:8000/uploads/statute_95s5yKU.pdf",
      "real_address": "dasdasdasd",
      "legal_address": "dadasdasdas",
      "email": "asdsadasd",
      "legal_representative": {
        "id": 8,
        "name": "adasdasd",
        "last_name": "asdsadasd",
        "percentage": 132,
        "society_registration": 4
      },
      "export": [
        {
          "state": null,
          "country": {
            "id": 3,
            "name": "Argentina"
          }
        }
      ]
    },
    "status": {
      "id": 1,
      "name": "Pending"
    },
    "qr": null,
    "associate": [
      {
        "id": 8,
        "name": "adasdasd",
        "last_name": "asdsadasd",
        "percentage": 132,
        "society_registration": 4
      },
      {
        "id": 7,
        "name": "adasdasd",
        "last_name": "asdsadasd",
        "percentage": 132,
        "society_registration": 4
      }
    ]
  },
  {
    "id": 5,
    "due_date": null,
    "observation": null,
    "file_number": null,
    "hash": null,
    "date_created": "2021-10-14",
    "anonymous_society": {
      "name": "German",
      "date_created": "2021-10-02",
      "statute": "http://app.bonita.com:8000/uploads/statute_gzzfLJG.pdf",
      "real_address": "Un Domicilio",
      "legal_address": "sdsdgfsg",
      "email": "fgsfgdf@gmail.com",
      "legal_representative": {
        "id": 10,
        "name": "Hola",
        "last_name": "Trolazo",
        "percentage": 50,
        "society_registration": 5
      },
      "export": [
        {
          "state": "Un estado",
          "country": {
            "id": 4,
            "name": "Angola"
          }
        }
      ]
    },
    "status": {
      "id": 1,
      "name": "Pending"
    },
    "qr": null,
    "associate": [
      {
        "id": 11,
        "name": "dafwdfre",
        "last_name": "frefre",
        "percentage": 25,
        "society_registration": 5
      },
      {
        "id": 10,
        "name": "Hola",
        "last_name": "Trolazo",
        "percentage": 50,
        "society_registration": 5
      },
      {
        "id": 9,
        "name": "Hola",
        "last_name": "Mundo",
        "percentage": 25,
        "society_registration": 5
      }
    ]
  },
  {
    "id": 6,
    "due_date": null,
    "observation": null,
    "file_number": null,
    "hash": null,
    "date_created": "2021-10-14",
    "anonymous_society": {
      "name": "asdasdasd",
      "date_created": "2021-10-01",
      "statute": "http://app.bonita.com:8000/uploads/statute_ltLZczM.pdf",
      "real_address": "dasdadasd",
      "legal_address": "asdasdasdas",
      "email": "dasdasda@gmail.com",
      "legal_representative": {
        "id": 13,
        "name": "asdasd",
        "last_name": "dasdas",
        "percentage": 85,
        "society_registration": 6
      },
      "export": [
        {
          "state": null,
          "country": {
            "id": 3,
            "name": "Argentina"
          }
        }
      ]
    },
    "status": {
      "id": 1,
      "name": "Pending"
    },
    "qr": null,
    "associate": [
      {
        "id": 13,
        "name": "asdasd",
        "last_name": "dasdas",
        "percentage": 85,
        "society_registration": 6
      },
      {
        "id": 12,
        "name": "asdasd",
        "last_name": "dasdas",
        "percentage": 15,
        "society_registration": 6
      }
    ]
  },
  {
    "id": 7,
    "due_date": null,
    "observation": null,
    "file_number": null,
    "hash": null,
    "date_created": "2021-10-14",
    "anonymous_society": {
      "name": "Una sssa",
      "date_created": "2021-10-17",
      "statute": "http://app.bonita.com:8000/uploads/statute_gp0qodf.pdf",
      "real_address": "asdasdas",
      "legal_address": "saddad",
      "email": "dsadasd@gmail.com",
      "legal_representative": {
        "id": 15,
        "name": "asdsadas",
        "last_name": "sdfsdf",
        "percentage": 50,
        "society_registration": 7
      },
      "export": [
        {
          "state": "sfggggg",
          "country": {
            "id": 5,
            "name": "Albania"
          }
        }
      ]
    },
    "status": {
      "id": 1,
      "name": "Pending"
    },
    "qr": null,
    "associate": [
      {
        "id": 15,
        "name": "asdsadas",
        "last_name": "sdfsdf",
        "percentage": 50,
        "society_registration": 7
      },
      {
        "id": 14,
        "name": "asdsadas",
        "last_name": "asdasdas",
        "percentage": 50,
        "society_registration": 7
      }
    ]
  },
  {
    "id": 8,
    "due_date": null,
    "observation": null,
    "file_number": null,
    "hash": null,
    "date_created": "2021-10-14",
    "anonymous_society": {
      "name": "Este us un nombre de test",
      "date_created": "2021-10-09",
      "statute": "http://app.bonita.com:8000/uploads/statute_NGjROe0.pdf",
      "real_address": "Un domicilio",
      "legal_address": "domicilio legal",
      "email": "velazquez.german97@gmail.com",
      "legal_representative": {
        "id": 17,
        "name": "Tomas",
        "last_name": "Facu",
        "percentage": 25,
        "society_registration": 8
      },
      "export": [
        {
          "state": "Un estado de prueba",
          "country": {
            "id": 4,
            "name": "Angola"
          }
        }
      ]
    },
    "status": {
      "id": 1,
      "name": "Pending"
    },
    "qr": null,
    "associate": [
      {
        "id": 18,
        "name": "Nico",
        "last_name": "Poy",
        "percentage": 50,
        "society_registration": 8
      },
      {
        "id": 17,
        "name": "Tomas",
        "last_name": "Facu",
        "percentage": 25,
        "society_registration": 8
      },
      {
        "id": 16,
        "name": "German",
        "last_name": "Velazquez",
        "percentage": 25,
        "society_registration": 8
      }
    ]
  },
  {
    "id": 9,
    "due_date": null,
    "observation": null,
    "file_number": null,
    "hash": null,
    "date_created": "2021-10-14",
    "anonymous_society": {
      "name": "hteb",
      "date_created": "2021-09-30",
      "statute": "http://app.bonita.com:8000/uploads/statute_JXJkks5.pdf",
      "real_address": "bfbddb",
      "legal_address": "ddbf",
      "email": "fvfbdfbddbbdf",
      "legal_representative": {
        "id": 21,
        "name": "bddffbd",
        "last_name": "bfdbfg",
        "percentage": 80,
        "society_registration": 9
      },
      "export": [
        {
          "state": null,
          "country": {
            "id": 3,
            "name": "Argentina"
          }
        }
      ]
    },
    "status": {
      "id": 1,
      "name": "Pending"
    },
    "qr": null,
    "associate": [
      {
        "id": 21,
        "name": "bddffbd",
        "last_name": "bfdbfg",
        "percentage": 80,
        "society_registration": 9
      },
      {
        "id": 20,
        "name": "bddffbd",
        "last_name": "bfdbfg",
        "percentage": 10,
        "society_registration": 9
      },
      {
        "id": 19,
        "name": "bddffbd",
        "last_name": "bfdbfg",
        "percentage": 10,
        "society_registration": 9
      }
    ]
  },
  {
    "id": 10,
    "due_date": null,
    "observation": null,
    "file_number": null,
    "hash": null,
    "date_created": "2021-10-17",
    "anonymous_society": {
      "name": "Pepsi",
      "date_created": "2021-10-01",
      "statute": "http://app.bonita.com:8000/uploads/statute.pdf",
      "real_address": "domicilio pepsi",
      "legal_address": "domicilio legal pepsi",
      "email": "pepsi@gmail.com",
      "legal_representative": {
        "id": 23,
        "name": "S",
        "last_name": "Dos",
        "percentage": 50,
        "society_registration": 10
      },
      "export": [
        {
          "state": "Otro",
          "country": {
            "id": 6,
            "name": "Australia"
          }
        },
        {
          "state": "Por ahi",
          "country": {
            "id": 1,
            "name": "Algeria"
          }
        }
      ]
    },
    "status": {
      "id": 1,
      "name": "Pending"
    },
    "qr": null,
    "associate": [
      {
        "id": 23,
        "name": "S",
        "last_name": "Dos",
        "percentage": 50,
        "society_registration": 10
      },
      {
        "id": 22,
        "name": "S",
        "last_name": "Uno",
        "percentage": 50,
        "society_registration": 10
      }
    ]
  }
]