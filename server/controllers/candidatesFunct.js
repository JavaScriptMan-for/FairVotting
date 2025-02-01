class candidateFunct {
    async getCandidates (req, res) {
        const candidates = [
             {
                id: 1,
                name: "Владимир",
                patronymic: "Владимирович",
                surname: "Путин",
                president: "Владимир Владимирович Путин",
                party: "Единая Россия",
                description: `
                1952 года рождения; место жительства - город Москва; руководитель партии
                «Единая Россия» — российская политическая партия,
                крупнейшая политическая партия Российской Федерации.
                Образована 1 декабря 2001 года в форме объединения движения «Единство»,
                избирательных блоков «Отечество — Вся Россия» и «Наш дом — Россия».
                `
            },
             {
                id: 2,
                name: "Владимир",
                patronymic: "Вольфович",
                surname: "Жириновский",
                president: "Владимир Вольфович Жириновский",
                party: "ЛДПР",
                description: `
                1946 года рождения; место жительства - город Москва; Государственная Дума Федерального Собрания Российской Федерации, 
                депутат, руководитель фракции Политическая партия ⟪Либерально-демократическая партия России⟫, член Комитета
                Государственной Думы по обороне, выдвинут Политической партией ⟪Либерально-демократическая партия России⟫;
                член Политической партии ⟪Либерально-демократическая партия России⟫, Председатель партии.
                `
            },
             {
                id: 3,
                name: "Алесей",
                patronymic: "Анатольевич",
                surname: "Навальный",
                president: "Алексей Анатольевич Навальный",
                party: "Россия Будущего",
                description: `
                1976 года рождения; место жительства - город Москва; руководитель либеральной партии ⟪Россия Будущего⟫;
                основатель ⟪Фонда по борьбе с коррупцией⟫.
                Цель: борьба с коррупцией в России, демократизация выборов, развитие Свободы Слова.
                `
            },
             {
                id: 4,
                name: "Геннадий",
                patronymic: "Андреевич",
                surname: "Зюганов",
                president: "Геннадий Андреевич Зюганов",
                party: "КПРФ",
                description: `
                    1944 года рождения; место жительства - город Москва; руководитель
                     Коммунистической партии Российской Федерации (КПРФ) — политическая партия социал-патриотической ориентации.
                    Цель КПРФ: построить в России обновлённый социализм, который будет отвечать запросам современного общества и ставить в центре системы работника.
                `
            },
             {
                id: 5,
                name: "Григорий",
                patronymic: "Алексеевич",
                surname: "Явлинский",
                president: "Григорий Алексеевич Явлинский",
                party: "Яблоко",
                description: `
                    1952 года рождения; место жительства; место жительства - город Москва; руководитель
                    партии ⟪Политическая партия ⟪Российская объединённая демократическая партия ⟪Яблоко⟫⟫⟫.
                    Цель: развитие демократических ценностей в России и поддержание дружеских
                    дипломатических отношений с Европейскими и Азиатскими странами.
                `
            },
             {
                id: 6,
                name: "Сергей",
                patronymic: "Михайлович",
                surname: "Миронов",
                president: "Сергей Михайлович Миронов",
                party: "Справедливая Россия",
                description: `
                1953 года рождения; место жительства - город Санкт-Петербург; руководитель
                партии ⟪Справедливая Россия⟫. Цель: поддержка Специальной военной операции на территории Украины.
                `
            },
             {
                id: 7,
                name: "Борис",
                patronymic: "Борисович",
                surname: "Надеждин",
                president: "Борис Борисович Надеждин",
                party: "Гражданская инициатива",
                description: `
                1963 года рождения; место жительства - город Москва; руководитель
                партии ⟪Гражданская инициатива⟫. Цель: незамедлительная остановка войны на Украине.
                `
            },
             {
                id: 8,
                name: "Вечеслав",
                patronymic: "Андреевич",
                surname: "Даванков",
                president: "Владислав Андреевич Даванков",
                party: "Новые люди",
                description: `
                1984 года рождения; место жительства - город Москва; руководитель
                партии ⟪Новые люди⟫. Цель: Благоустройство городов, строительство школ, детских садов, больниц
                и других объектов инфраструктуры.
                `
            }
        ]
        res.status(200).json({candidates});
    }
}
module.exports = new candidateFunct;