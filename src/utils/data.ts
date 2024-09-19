import { IDocData, IReview, ISlider, ITarif } from "../types";

export const sliders: ISlider[] = [
    {
        icon: "/carousel-speed.svg",
        text: "Высокая и оперативная скорость обработки заявки",
    },
    {
        icon: "/carousel-search.svg",
        text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    },
    {
        icon: "/carousel-protect.svg",
        text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    },
    {
        icon: "/carousel-search.svg",
        text: "jfaksfj akljdflkajsf dlkadjflakdfjadfjak lfdj;alksfj ;aldjfkla",
    },
    {
        icon: "/carousel-protect.svg",
        text: "sskjfasdjfklaj fkajsfkajdk afakljflkajfkl",
    },
    {
        icon: "/carousel-protect.svg",
        text: "wf lfkaelkf;la laklaekga;lkg  lak;la",
    },
]

export const tarifs: ITarif[] = [
    {
        title: "Beginner",
        description: "Для небольшого исследования",
        icon: "tarifs-bulb.svg",
        mainColor: "#FFB64F",
        curPrice: "799",
        prevPrice: "1 200",
        partPrice: "или 150 ₽/мес. при рассрочке на 24 мес.",
        include: ["Безлимитная история запросов", "Безопасная сделка","Поддержка 24/7"],
        isActive: true
    },
    {
        title: "Pro",
        description: "Для HR и фрилансеров",
        icon: "tarifs-darts.svg",
        mainColor: "#7CE3E1",
        curPrice: "1 299",
        prevPrice: "2 600",
        partPrice: "или 279 ₽/мес. при рассрочке на 24 мес.",
        include: ["Все пункты тарифа Beginner", "Экспорт истории","Рекомендации по приоритетам"],
        isActive: false
    },
    {
        title: "Business",
        description: "Для корпоративных клиентов",
        icon: "tarifs-note.svg",
        mainColor: "#000000",
        curPrice: "2 379",
        prevPrice: "3 700",
        include: ["Все пункты тарифа Pro", "Безлимитное количество запросов","Приоритетная поддержка"],
        isActive: false
    },
]

export const reviews: IReview[] = [
    {
        period: "10.09.2021",
        total: "5",
        risks: "0",
    },
    {
        period: "13.09.2021",
        total: "2",
        risks: "0",
    },
    {
        period: "17.09.2021",
        total: "6",
        risks: "0",
    },
    {
        period: "20.09.2021",
        total: "8",
        risks: "2",
    },
    {
        period: "12.10.2021",
        total: "1",
        risks: "0",
    },
    {
        period: "15.10.2021",
        total: "10",
        risks: "2",
    },
    {
        period: "16.10.2021",
        total: "4",
        risks: "0",
    },
    {
        period: "17.10.2021",
        total: "3",
        risks: "0",
    },
]

export const fakeCard: IDocData = {
        id: "string",
          
          issueDate: "15.10.2021",
          url: 'https://www.vesti.ru/doc.html?id=3206990',
          sourceName: "VC.RU",
          title: {
            text: 'Работа в Data Science в 2022 году: тренды, навыки и обзор специализаций',
            // markup?: string
          },
          content: {
            markup: `Кто такой Data Scientist и чем он занимается?
Data Scientist — это специалист, который работает с большими массивами данных, чтобы с их помощью решить задачи бизнеса. Простой пример использования больших данных и искусственного интеллекта — умные ленты в социальных сетях. На основе ваших просмотров и лайков алгоритм выдает рекомендации с контентом, который может быть вам интересен. Эту модель создал и обучил дата-сайентист, и скорее всего, не один.

В небольших компаниях и стартапах дата-сайентист делает все: собирает и очищает данные, создает математическую модель для их анализа, тестирует ее и презентует готовое решение бизнесу.`
          },    
          attributes: {
            isTechNews: true,
            isAnnouncement: true,
            isDigest: false,
            wordCount: 656,
          } 
        
      }

  



