interface HistoricalEvent {
  date: string
  event: string
}

interface StaticEvents {
  histori: HistoricalEvent[]
  literatur: HistoricalEvent[]
  fest_e_shtetit: HistoricalEvent[]
}

export const historicalEvents: StaticEvents = {
  histori: [
    {
      date: "1974-02-28",
      event: "New Yugoslav constitution grants more autonomy to Kosovo"
    },
    {
      date: "1985-04-11",
      event: "Death of Enver Hoxha, long-time leader of communist Albania"
    },
    {
      date: "1991-06-12",
      event: "Albania holds its first multi-party elections since 1923"
    },
    {
      date: "1997-03-01",
      event: "Albanian Civil War begins following the collapse of pyramid schemes"
    },
    {
      date: "1999-03-24",
      event: "NATO begins bombing campaign against Yugoslavia to end Kosovo War"
    },
    {
      date: "2008-02-17",
      event: "Kosovo declares independence from Serbia"
    },
    {
      date: "2009-04-01",
      event: "Albania joins NATO"
    },
    {
      date: "2014-06-27",
      event: "Albania receives candidate status for European Union membership"
    },
    {
      date: "1878-06-10",
      event: "Founding of the Albanian League (League of Prizren), the first Albanian nationalist organization"
    },
    {
      date: "1912-11-28",
      event: "Albania declares independence from the Ottoman Empire"
    },
    {
      date: "1974-01-01",
      event: "New Yugoslav constitution grants full Albanian-language cultural facilities in Kosovo"
    }
  ],
  literatur: [
    {
      date: "1974-01-01",
      event: "New Yugoslav constitution allows for full Albanian-language cultural facilities in Kosovo"
    },
    {
      date: "1980-01-01",
      event: "Kosovo Albanian literature flourishes following increased freedoms"
    },
    {
      date: "1990-01-01",
      event: "End of communist censorship in Albania, leading to new literary expressions"
    },
    {
      date: "2005-06-02",
      event: "Ismail Kadare wins the inaugural Man Booker International Prize"
    },
    {
      date: "2016-01-01",
      event: "Publication of 'My Cat Yugoslavia' by Pajtim Statovci, marking new diaspora literature"
    },
    {
      date: "1949-01-01",
      event: "Esad Mekuli founds the literary periodical 'Jeta e Re'"
    },
    {
      date: "1953-01-01",
      event: "Martin Camaj publishes 'Njifyell ndër male' (A flute in the mountains)"
    },
    {
      date: "1954-01-01",
      event: "Martin Camaj publishes 'Kânga e vërrinit' (Song of the lowland pastures)"
    },
    {
      date: "1685-01-01",
      event: "Pjetër Bogdani publishes 'Cuneus Prophetarum' (The Band of the Prophets), the first original prose work in Albanian"
    }
  ],
  fest_e_shtetit: [
    {
      date: "11-28",
      event: "Flag Day and Independence Day (Albania)"
    },
    {
      date: "02-17",
      event: "Independence Day (Kosovo)"
    },
    {
      date: "03-14",
      event: "Summer Day (Albania)"
    },
    {
      date: "05-05",
      event: "Martyrs' Day (Albania)"
    },
    {
      date: "06-12",
      event: "Peace Day (Kosovo)"
    },
    {
      date: "03-07",
      event: "Teacher's Day (Dita e Mësuesit)"
    },
    {
      date: "05-06",
      event: "St. George's Day (Shëngjergji)"
    }
  ]
}