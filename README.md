# DemagogTV

Projekt jede na [https://demagogtv.cz](https://demagogtv.cz)

> Sledujte rozhovor a zároveň, zda politik říká pravdu či ne. Propojili jsme
> videozáznamy debat s výroky tak, že v čase vyřčení naskočí hodnocení od
> [Demagog.cz](http://demagog.cz).

![](./screenshot-demagogtv.png)

## Technologie

* UI postaveno v Reactu
* Server je v Express nad Node.js a předrendrovává UI (server-side rendering)
* Běží na Heroku

## Spuštění lokálně

Pouze klient:

```
git clone git@github.com:vlki/demagogtv.git
cd demagogtv
yarn install
yarn run start
```

I se serverem:

```
git clone git@github.com:vlki/demagogtv.git
cd demagogtv
yarn install
yarn run build
yarn run server
```

## Licence

* Data o výrocích patří projektu [Demagog.cz](http://demagog.cz)
* Ostatní je pod licencí [MIT](LICENSE.md)
