/* Товары из БД Postgres. */

const goods = [
  {
    "id": 1,
    "name": "Пиццы",
    "createdAt": "2025-07-21T09:21:48.587Z",
    "updatedAt": "2025-07-21T09:21:48.587Z",
    "products": [
      {
        "id": 18,
        "name": "Пепперони фреш",
        "imageUrl": "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
        "categoryId": 1,
        "createdAt": "2025-07-21T09:21:48.606Z",
        "updatedAt": "2025-07-21T09:21:48.606Z",
        "productVariations": [
          {
            "id": 1,
            "price": 388,
            "size": 20,
            "pizzaType": 1,
            "productId": 18
          },
          {
            "id": 2,
            "price": 510,
            "size": 30,
            "pizzaType": 2,
            "productId": 18
          },
          {
            "id": 3,
            "price": 466,
            "size": 40,
            "pizzaType": 2,
            "productId": 18
          }
        ],
        "ingredients": [
          {
            "id": 1,
            "name": "Сырный бортик",
            "price": 179,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 2,
            "name": "Сливочная моцарелла",
            "price": 79,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 3,
            "name": "Сыры чеддер и пармезан",
            "price": 79,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 4,
            "name": "Острый перец халапеньо",
            "price": 59,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 5,
            "name": "Нежный цыпленок",
            "price": 79,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          }
        ]
      },
      {
        "id": 19,
        "name": "Сырная",
        "imageUrl": "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
        "categoryId": 1,
        "createdAt": "2025-07-21T09:21:48.619Z",
        "updatedAt": "2025-07-21T09:21:48.619Z",
        "productVariations": [
          {
            "id": 4,
            "price": 377,
            "size": 20,
            "pizzaType": 1,
            "productId": 19
          },
          {
            "id": 5,
            "price": 526,
            "size": 30,
            "pizzaType": 1,
            "productId": 19
          },
          {
            "id": 6,
            "price": 264,
            "size": 40,
            "pizzaType": 1,
            "productId": 19
          },
          {
            "id": 7,
            "price": 510,
            "size": 20,
            "pizzaType": 2,
            "productId": 19
          },
          {
            "id": 8,
            "price": 499,
            "size": 30,
            "pizzaType": 2,
            "productId": 19
          },
          {
            "id": 9,
            "price": 569,
            "size": 40,
            "pizzaType": 2,
            "productId": 19
          }
        ],
        "ingredients": [
          {
            "id": 6,
            "name": "Шампиньоны",
            "price": 59,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 7,
            "name": "Ветчина",
            "price": 79,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 8,
            "name": "Пикантная пепперони",
            "price": 79,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 9,
            "name": "Острая чоризо",
            "price": 79,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 10,
            "name": "Маринованные огурчики",
            "price": 59,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          }
        ]
      },
      {
        "id": 20,
        "name": "Чоризо фреш",
        "imageUrl": "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
        "categoryId": 1,
        "createdAt": "2025-07-21T09:21:48.628Z",
        "updatedAt": "2025-07-21T09:21:48.628Z",
        "productVariations": [
          {
            "id": 10,
            "price": 521,
            "size": 20,
            "pizzaType": 1,
            "productId": 20
          },
          {
            "id": 11,
            "price": 276,
            "size": 30,
            "pizzaType": 2,
            "productId": 20
          },
          {
            "id": 12,
            "price": 511,
            "size": 40,
            "pizzaType": 2,
            "productId": 20
          }
        ],
        "ingredients": [
          {
            "id": 11,
            "name": "Свежие томаты",
            "price": 59,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 12,
            "name": "Красный лук",
            "price": 59,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 13,
            "name": "Сочные ананасы",
            "price": 59,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 14,
            "name": "Итальянские травы",
            "price": 39,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 15,
            "name": "Сладкий перец",
            "price": 59,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 16,
            "name": "Кубики брынзы",
            "price": 79,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          },
          {
            "id": 17,
            "name": "Митболы",
            "price": 79,
            "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
            "createdAt": "2025-07-21T09:21:48.592Z",
            "updatedAt": "2025-07-21T09:21:48.592Z"
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "name": "Завтрак",
    "createdAt": "2025-07-21T09:21:48.587Z",
    "updatedAt": "2025-07-21T09:21:48.587Z",
    "products": [
      {
        "id": 1,
        "name": "Омлет с ветчиной и грибами",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp",
        "categoryId": 2,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 13,
            "price": 297,
            "size": null,
            "pizzaType": null,
            "productId": 1
          }
        ],
        "ingredients": []
      },
      {
        "id": 2,
        "name": "Омлет с пепперони",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp",
        "categoryId": 2,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 14,
            "price": 204,
            "size": null,
            "pizzaType": null,
            "productId": 2
          }
        ],
        "ingredients": []
      },
      {
        "id": 3,
        "name": "Кофе Латте",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
        "categoryId": 2,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 15,
            "price": 492,
            "size": null,
            "pizzaType": null,
            "productId": 3
          }
        ],
        "ingredients": []
      }
    ]
  },
  {
    "id": 3,
    "name": "Закуски",
    "createdAt": "2025-07-21T09:21:48.587Z",
    "updatedAt": "2025-07-21T09:21:48.587Z",
    "products": [
      {
        "id": 4,
        "name": "Дэнвич ветчина и сыр",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp",
        "categoryId": 3,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 16,
            "price": 351,
            "size": null,
            "pizzaType": null,
            "productId": 4
          }
        ],
        "ingredients": []
      },
      {
        "id": 5,
        "name": "Куриные наггетсы",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp",
        "categoryId": 3,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 17,
            "price": 422,
            "size": null,
            "pizzaType": null,
            "productId": 5
          }
        ],
        "ingredients": []
      },
      {
        "id": 6,
        "name": "Картофель из печи с соусом 🌱",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp",
        "categoryId": 3,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 18,
            "price": 439,
            "size": null,
            "pizzaType": null,
            "productId": 6
          }
        ],
        "ingredients": []
      },
      {
        "id": 7,
        "name": "Додстер",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp",
        "categoryId": 3,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 19,
            "price": 593,
            "size": null,
            "pizzaType": null,
            "productId": 7
          }
        ],
        "ingredients": []
      },
      {
        "id": 8,
        "name": "Острый Додстер 🌶️🌶️",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp",
        "categoryId": 3,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 20,
            "price": 231,
            "size": null,
            "pizzaType": null,
            "productId": 8
          }
        ],
        "ingredients": []
      }
    ]
  },
  {
    "id": 4,
    "name": "Коктейли",
    "createdAt": "2025-07-21T09:21:48.587Z",
    "updatedAt": "2025-07-21T09:21:48.587Z",
    "products": [
      {
        "id": 9,
        "name": "Банановый молочный коктейль",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp",
        "categoryId": 4,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 21,
            "price": 215,
            "size": null,
            "pizzaType": null,
            "productId": 9
          }
        ],
        "ingredients": []
      },
      {
        "id": 10,
        "name": "Карамельное яблоко молочный коктейль",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp",
        "categoryId": 4,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 22,
            "price": 222,
            "size": null,
            "pizzaType": null,
            "productId": 10
          }
        ],
        "ingredients": []
      },
      {
        "id": 11,
        "name": "Молочный коктейль с печеньем Орео",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp",
        "categoryId": 4,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 23,
            "price": 305,
            "size": null,
            "pizzaType": null,
            "productId": 11
          }
        ],
        "ingredients": []
      },
      {
        "id": 12,
        "name": "Классический молочный коктейль 👶",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp",
        "categoryId": 4,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 24,
            "price": 523,
            "size": null,
            "pizzaType": null,
            "productId": 12
          }
        ],
        "ingredients": []
      }
    ]
  },
  {
    "id": 5,
    "name": "Напитки",
    "createdAt": "2025-07-21T09:21:48.587Z",
    "updatedAt": "2025-07-21T09:21:48.587Z",
    "products": [
      {
        "id": 13,
        "name": "Ирландский Капучино",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp",
        "categoryId": 5,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 25,
            "price": 263,
            "size": null,
            "pizzaType": null,
            "productId": 13
          }
        ],
        "ingredients": []
      },
      {
        "id": 14,
        "name": "Кофе Карамельный капучино",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp",
        "categoryId": 5,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 26,
            "price": 326,
            "size": null,
            "pizzaType": null,
            "productId": 14
          }
        ],
        "ingredients": []
      },
      {
        "id": 15,
        "name": "Кофе Кокосовый латте",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp",
        "categoryId": 5,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 27,
            "price": 515,
            "size": null,
            "pizzaType": null,
            "productId": 15
          }
        ],
        "ingredients": []
      },
      {
        "id": 16,
        "name": "Кофе Американо",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp",
        "categoryId": 5,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 28,
            "price": 423,
            "size": null,
            "pizzaType": null,
            "productId": 16
          }
        ],
        "ingredients": []
      },
      {
        "id": 17,
        "name": "Кофе Латте",
        "imageUrl": "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
        "categoryId": 5,
        "createdAt": "2025-07-21T09:21:48.599Z",
        "updatedAt": "2025-07-21T09:21:48.599Z",
        "productVariations": [
          {
            "id": 29,
            "price": 250,
            "size": null,
            "pizzaType": null,
            "productId": 17
          }
        ],
        "ingredients": []
      }
    ]
  }
];

const cart = {
  "id": 1,
  "userId": 1,
  "token": "111111",
  "totalAmount": 0,
  "createdAt": "2025-07-21T09:21:48.642Z",
  "updatedAt": "2025-07-21T09:21:48.642Z",
  "cartProductVariations": [
    {
      "id": 1,
      "cartId": 1,
      "productVariationId": 1,
      "quantity": 2,
      "createdAt": "2025-07-21T09:21:48.647Z",
      "updatedAt": "2025-07-21T09:21:48.647Z",
      "productVariation": {
        "id": 1,
        "price": 388,
        "size": 20,
        "pizzaType": 1,
        "productId": 18,
        "product": {
          "id": 18,
          "name": "Пепперони фреш",
          "imageUrl": "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
          "categoryId": 1,
          "createdAt": "2025-07-21T09:21:48.606Z",
          "updatedAt": "2025-07-21T09:21:48.606Z"
        }
      },
      "ingredients": [
        {
          "id": 1,
          "name": "Сырный бортик",
          "price": 179,
          "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
          "createdAt": "2025-07-21T09:21:48.592Z",
          "updatedAt": "2025-07-21T09:21:48.592Z"
        },
        {
          "id": 2,
          "name": "Сливочная моцарелла",
          "price": 79,
          "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
          "createdAt": "2025-07-21T09:21:48.592Z",
          "updatedAt": "2025-07-21T09:21:48.592Z"
        },
        {
          "id": 3,
          "name": "Сыры чеддер и пармезан",
          "price": 79,
          "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
          "createdAt": "2025-07-21T09:21:48.592Z",
          "updatedAt": "2025-07-21T09:21:48.592Z"
        }
      ]
    }
  ]
}

/* const categories: ({
    products: ({
        ingredients: {
            id: number;
            name: string;
            price: number;
            imageUrl: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        productVariations: {
            id: number;
            price: number;
            size: number | null;
            pizzaType: number | null;
            productId: number;
        }[];
    } & {
        id: number;
        name: string;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
    })[];
} & {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
})[] */

