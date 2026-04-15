import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

(pdfMake as any).vfs = (pdfFonts as any).vfs;

type Product = {
  cliente: string;
  obra: string;
  direccion: string;
  concepto: string;
  cantidad: number;
  precioUnitario: number;
};

const generatePDF = (
  products: Product[],
  cotizacion: string,
  fecha: string,
  notas: string,
) => {
  //Estilos de la tabla
  const styles = {
    header: {
      fontSize: 14,
      bold: true,
    },
    subheader: {
      fontSize: 12,
    },
    tableHeader: {
      bold: true,
      fontSize: 12,
    },
    total: {
      fontSize: 12,
      bold: true,
    },
  };
  const cliente = products[0]?.cliente || "";
  const obra = products[0]?.obra || "";
  const direccion = products[0]?.direccion || "";
  const logoBase64 =
    "data:image/png;base64,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oAUAACAlgRYAAICUBFoAAABSEmgBAABISaAFAAAgJYEWAACAlARaAAAAUhJoAQAASEmgBQAAICWBFgAAgJQEWgAAAFISaAEAAEhJoAUAACAlgRYAAICUBFoAAABSEmgBAABISaAFAAAgJYEWAACAlARaAAAAUhJoAQAASEmgBQAAICWBFgAAgJQEWgAAAFISaAEAAEhJoAUAACAlgRYAAICUBFoAAABSEmgBAABISaAFAAAgJYEWAACAlARaAAAAUhJoAQAASEmgBQAAICWBFgAAgJQEWgAAAFISaAEAAEhJoAUAACAlgRYAAICUBFoAAABSEmgBAABISaAFAAAgJYEWAACAlARaAAAAUhJoAQAASEmgBQAAICWBFgAAgJQEWgAAAFISaAEAAEhJoAUAACAlgRYAAICUBFoAAABSEmgBAABISaAFAAAgJYEWAACAlARaAAAAUhJoAQAASEmgBQAAICWBFgAAgJQEWgAAAFISaAEAAEhJoAUAACAlgRYAAICUBFoAAABSEmgBAABISaAFAAAgJYEWAACAlARaAAAAUhJoAQAASEmgBQAAICWBFgAAgJQEWgAAAFISaAEAAMinaZr/H8ZU4D/iPBEvAAAAAElFTkSuQmCC";
  const facebook =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMrSURBVGiB1dpLiBxFGMDx3/RmD5pETAJmja9E3PWFhCDJQREUQTwEX+BB9CZ4Cp48eEgOXrwoIYgegiCoRx85RA+eTIJGJSIYCCo+kk1C0KhBVjHoZnc81DYOw/R0d3XN6w912Kmpqu/fj9qvv56WdNyA+7Adc7gR67B2pf9PXMBJfIdj+BinE8YQzWbswbdoR7ZvsFs4EEPnDryFSxWDrdKWcBB3DkNgPfZjOaFAd1sWDtJVg5J4HL8PUKC7/YbHUgpM49UhCnSfnX1Y1VTicnw4IonOdnAllmiJI2MgkbfDuKyuxBTeH4Pge52ZWpfZvgEG8w/OCf97TmOh5viXq0o8LP32urASwD3C5tHNFGZwF34umWsZO8sk1uPXxBLvYUPZwh38WGHOX4T0p5D9iSVeQauGRFWRNl4rmuA2IU1IJXFI3P5fVeQSbu41wdsJJdpCFhxDVZE23ugefA0WE0ociZSoK/Ivrub/U/+kBGlABx9V+M40HsCtwq6Vc2WNdabxBPbmHxyX9rK6vySAa3Ei0Vpf5ZNuSizRFp5X+nEg4VrL2JgJj6epudCnryVcUqlo4d4MOxJOmrPUp2+DBplsATsyBXvxAJkq/0pt5jLcNICJh81spiRnmRDWZVgz6igSsLYl3JhZxODP8FRB37ziG35KcQ1rG96NiGVxFf4Wd1Yu4qeIcUt9xt0dMR/8leGPyMGDIHYHXciEy2BciBU5meH7lJE0ZC5y3A8ZvkwZSQMyzEaOPZbhaMJgmnC9iLrVCkdbwpE4I2TBdTiHDwr6nhPeh/TiCrzU4/MZPFQzBkJJaXP+R+rabr9K+kzitfZ2Tr59gkW2dS/w+QSKHOq1wCMTKPJg0SKfTJDI4T5r2CqUWMZdZFGPe6ObFydA5IUyCUKtqOkLnkGKfKp3Rb8nm3B2DEXmsbGqRM6s8ncVwxQ5j1vqSuRsFVKRUYucwe2xEjlb1C9vphT5Gtc1lchZjTdHIPK6+Iy4LztxqkIATUXO4tFBCHSyGs8LP7FILXJeeARIXVLtyxo8IzxhNhX5Ak8LB2mkbMGzwhvceeUip/AOdkn0O63/ADvQDmB3WI9rAAAAAElFTkSuQmCC";
  const instagram =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAUXSURBVGiB3ZpNaF1FFMd/7/YlWrSmURsbrQltUlrqoggWFVsVFAXxC5FuqhQU3IgfRVqt1KULlyoFbYKUiq66qZCAuNEs1C402tqCkKSmCUabvteK2tp8PRfnPp135tx7574kL9U/DMnMO+fMf+58nDMfBcKwDLgTuBvoBNbEf5c7MiuBgpNvAq5Wdv4App18BTjv5C8Co8B4/HcA+AqYDeSZiC6gFyjFlS5FKsUcuuppwAqgB/l6S9UAnaaAA/i9nIibgW8uA+JJ6RiwVpMuqPxa4CiwKqWhZ4GxOJWoHfPn48qysAIoqrJW4ErkQ3YA16bonwHuAE4lGT+O/RWGgZeAdQEkFwrrgJeBkQROx2POHnoM4RlgD/7XaySagNdiLprfAS3chT+xZ4DHG0Q2BE/gN2YKtZr14rd2T0Np1uIW4CHgJlW+F59nb/XHIr6fGEa6tNEoAAcdHtPA887vTfhzpoQ4bLbit3JXY3h7eNrgcgmJJKrYZchsjZCwQ+OTxWSbgruMsmbgVidvcdtWRGImF2VkaNWL64AHgPuB1YhPmkH8zgjQB3wJzBm6owk2x53/h4FziN+pohOgn9puGqyzAeuBj7GXSZ1+BnYjDtBFK+LkXNkjRl2DSqYffCdoKaYhAt6kvrjsFHCv0ZjXER/xHLYPO6LsHAMYUoUf5mhECzJU5hM7TQHP5qiTmKNrY6iI3+LQ2L8IHEbmgoU54AQyN0Dip01ID7poQnzBFOEfUXMsgkwk08Fk4F3sL1xCnOkNhs5q4FXs/c1FYEtg3dqBjwNMqML3AwzdjnxxTeYL4PoA/VWxrNYfxO8xC+8pvQmASVW4P8DQ5wmNaA7QraIZ2cpqOzsCdPcrncmI2L07mMkwshm4R5WVgSeRcR6KqVjnnCp/MUBXc1wWkX+yP2aUvYX0bF6ciXVdbAFuzNDTDSlaDcnqkQdVfg44lKGThkPUevkCySthFd6qZQ2trB7pUPkTwC8ZOmmYAE6qMh02aZhDS4fr0yQjQpZQF+OWYE6MqXxdQ0tDH0hoVHLKh0Db0HVkyRPh90Da/nwO+FWVrbEEc0LbmMiQ91baCH9OaCENHWpvAtozdNLQjmxt0+rQ8FbaCGO8ZRj5VOUjYGeGThp2UjtUKsBnGTqm7ytT6yXfyTCyGd8bl4G2ENYKbUb9RwP03tb11zO0vkdCFBetSCScN0Q5TO1Or0oyC6YTX8igcYCwnmnDjrO+ZR5B40KH8WXkZNBaANrj3/RwqgAXgNsC6zbD+J9U4cFAY0VkUibt/GaBH5AdZB8SAVi9WE1PBdYLtWdflbgN897q6sOLvOkS8EyOOsHY6kZIl7q4JofB34CHkcOHrGDTwggSIH6QU69F5S/Awh0HdQMfEX4c9ApwRZ11fafs9RfxAzYd3YZiCNndvYAc0N2HBH9tSONOI4drfcgFp3VAFwodHZ8GOUPSX6x7HpUsNtbj890bIeu5xqMNJJYXjxhlAyCe/Cz+cpbHSzcKSdcK/3h666JnX8NpZmMfPs8eV6Ab/+x2FtjeUJrp2I5wcjl6V29g98os8AZLO8yaYw66ERWMy1CQtyTDhnAF2ejsBjYsNmsHG+I6RxM4DeE4Rr333YisAGkPBn5H1u1R4M+4TB+y/YWc5VpYjn0vAnAV4iM6SLhDjzEJbAN+TJFhI8k9czkk8wlHElr4HzyqcfGfeeYUeiblPjzrQB6+dLJ4D8/G+Pfh2dcEXD79DbxiA0Y6l1dkAAAAAElFTkSuQmCC";
  const telefono =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAVMSURBVGiBxZprbBVFFIC/rm2pV3upFVGIVMBYo2kQaXygCCo/TEQjJMYfPiDSEDUx4Zd/KEpaJZqaGEWj0QRNBAk1kfiOj2gCaBor8REkplVBf6hJKRXtLdWW9vrj7LXbM7Ozj7sXv2SSuztnzpyZnceZM7eK7GgCbgCuAJqBBcDZwJl+fgE4DvwE9ANfAHuBXzK0ITVNQDvwPVBMmQ4Bm3xdp5wW4DXgZExj46RxYKevu+I0AM9k3ACdJoBXgVlJDKtKILsKeAU4xyEzBOwDvgL6gEHgTz8vD8xG5k8rcB3Q6NA1AKwDPkhgoxMP6AImsffgMPASsMyXTaJ3uV+2EKJ7EthKsg63MgN4PaSSAtCBrEzlMgvoBEZC6toJ1KRVXgu8H6L4LWBeGYaHcQHwTkidbwLVSRV6wC6Lsr+BBzMxOZwqYCPwj6X+7SQcZg9blPwFrMzO3khuQuaftuOhuAqux1xeC8DVGRsah2sx580YsDSqYA44rAqOI73zf3ELZsf2IQtRKFsxP+WmipoZjw4S2HUeMKqE9xO+N5yO+FndyE7cmpXVFk4DepRtw4Qs/U9ijsUwv6cOaWRQ/psMDbexBHOIdWihHOJK6KUujC7MT10EVmRouI0dqr5BZL/7jzuVwATiE9loBE5gb0h39rZPowXTVVodFNC76ScOZfdgb0RpOM7J1nYDPaR3g0zkGswhscOh6EJHXg2wIb2NsdilnlfiL0hLMXvW1avbLPLBdCBLqy0ssNS5yAMuU4L9wO8ORb9FVPReWgtjcgTznL/EAy5WL7+LULTPkdcDPJ7QsDQcVM/NHjBfveyPUNKDBBs0g8AaxEOuND+o5/keUK9eDkUoKSLndo2HuN6ngmPqOe8xFXcqMRJD0XbMIdgIPJ3SsKQU1HO9hzkU6mIoOgmsRzzjIOuAO9LZloha9TzmIdG/IK7IRpAvgUcs719Goo2VJK+ehz3gD/UySTChC3hDvTsD+JDoxniIG5Qk8lJCRyUHPWRdDqL3FReTwFrMTfAsJK671lH2CeSAdBBxe5IEFvSW0Q8SeAvukqMkD73MxTxZBn2huUpeO6lFv/wDRM/ROkyn9VYQd0QrjTwTW2hCIu22xowAzyJDabnFkGD6FYlChnGjkp8gEF7tV5nbUjQEpFN6HUbGTZ2OOp5Tsl8HMx9TmQOkj+zlkKNvOQ25O0R3LXBUyT4aFFiUQFlcbkc6JGkjxpGIo40NFnnjAHhACRzG3HiSkge2YB6jXWlziK4ZmHNwv01wtUXpxjIbUmIm0IZ4zmFR/UHgXoeOdkuZm0uZwThqFTJxgvvIUeBcv1BWLESWy8XI5jmE3Kd0M3WXorkEGTG5wLte4KqwSl5keov3lmt1BuSQTVMvuVe6Cv2oCrRX1sZIqoG3MYfU865CCy0FKu38uajBjGMVka+Tc5TjfszJl8ahy4I89kum48h8cbJHFdpdMTPdtCJHWd2IUWJEMqsRdz5YsE3JzAHuQs4b/UjcVZ8LyiEPPIVsiLoRJ/AdwyiusRRuAW5DzueHLPlF5Oy8GfeVdRSzkU3zmKOOZXGVbVGFJ0n2p4Bx5D68DbiU6Ll1EXAf8C72L1BKvUhALpLShvg58lWyosDUHwZKQ7YeuYNpJnpIjiHXHJ3+71jMxN0rwTSC9PxHMeWTpklk39AnwFiscSgeBz5DJvYKpjuRlyMrm+0aOWkaRYLTi9M0oMQLTO+Rb5HVYxVm8M5GA3Lm3oMMpbjGDyD/qliPjIqyqAI+Bn5G7kQ+9Ssoh3lIz56PNLLBf19A7ur7kOX7CNKgTPgXj4W3Wu4BuzwAAAAASUVORK5CYII=";
  const mail =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASISURBVGiB7dlbiFVVHAbw33HGoIioUUuZtEFBu9BDZaGVBkEQVC9FqRVRURH0MFFhN4oosggCi6gEmyKSnipkuoFQIRHZRTKzIikFu2ii5aXSGWemh7W3Z519zj6eyxyPwnywYO//Xnvt79vrW+u/9tqMYQxjGMPRhELmfBpuwGyccPjp1ITd+BIrsCV7sYAHsQ8jR0nZh/tlOuPJI4BYo+WJtCcuwOeRsj/wGjY7MtGDWzA5OR8RNFihqO4nTGgDuXoxARsVeb8Bv0aBBW2jVj8WKfLeAgeiwMz28aobsxR5H6B04CxHV9uo1Y4ugWvMvWwW2IledLSHY1UUcBO2KeedO619jTltIJuHc/CZfL5lSSY+H8LL2mu3roTDkOpcS07m4HUMZ+LtsFs1G/VjnipCepJG5uPbCg0cLrvl2ehHXJbU6VGDEOgUemFXps6w0GuTWiDgJDynNCWMYC8ewzFR3ZqFpJii9XY7lI2mVrinbiEpWmW3WmxUCT0aFMLo2q0eG426kBTN2K0RG7VMSIp67daojSqhxygKgfFCwsqSi5NpXlLbhXsEy9aLURVyHJ7CQAUhadmelOyYWiFYtFF0R+0NNCPkSmyqQHwl1lcRth6XNCEgRQEfJW2+Sv1CpuLtCgR/wRVJnfGCZeLZ7VA2moQbE1Kf4Dv8gNVC790m9EJWzMT0pFYhnbgXezL37McSwWZZTElIVLPRZDyP/+T3Ymyh5XJmtlqEnCfsJWUbXo2zcu6pBfOEzY54gliDpXgYD+DZ5DmDUb3tuLQeIWnSys42O3CH8g2+ejBf6M108PfhtCr1u/GSYu7aj4sPJSQvaaUZfKLm0K04kw0Iu5u14lrF3tkqvGyUC5mJVcpttA4XNikgxbKo3d4G7u+N7l+SBmOyfcpzwh5hkDeStCphSvSMr5Ta83J8jN/xTUL4dOHFrsJ9Sb0ObFAcLx1ZIdnSr7pvG8GtUfvXR/FrlI/FEcHK8YtOsTiKz80TsiVpuBVIdzaHlO5q/hw9fyMexftKxcVC5kbxmyldRg/IzwmjhdXJszZHsYkRhyHMSOIFwWKVhPRE8cXjhJkpxd14CP+ONvsI6TfL9gypFNuE3iGQXJPTTsmYHScsB1LcpfVbP+kH02AUi0llX+K+nHZOiY53dAoJb5HQjWcKi7o+Ff4GNYC9+FD44Dr4UExXOj72R8cnCy94ODqvhPOj43XpQSt/9HyRIfBeEt+t+CV5otJBfXsSn4G/o/gHSfxYYVE5Itjw4BReEH5j1bJwq7fEYwEej67FCbY/c9+fgv1+w1+KK4uVQg+k9RalAmJMFeb22clbahaDwvqoP4pdhE+T42W4MzmeJiTD6VHdASzE8XhF+DxIcQCP4GmaW/Q1inHClHq2IPRcwSaEaX8BzhDG1VtCTiEIvFpYp23FO8IftrbiKkVrbMKp7aXTHJYqHQ8Lhd5qCO2wVooOvKA4Rgify+9irTBJdAp5bZYw4J85zBzrwnVK/9Dmlb68Bjgyfq9twItCL+wUMn9ByBX/CLZbizfxfV4j/wNH/8TFd4gtgwAAAABJRU5ErkJggg==";
  const productsConImporte = products.map((p) => ({
    ...p,
    importe: p.cantidad * p.precioUnitario,
  }));
  const subtotal = productsConImporte.reduce((sum, p) => sum + p.importe, 0);
  const iva = +(subtotal * 0.16).toFixed(2);
  const totalGeneral = +(subtotal + iva).toFixed(2);
  const content: any[] = [];

  // ✅ TABLA SIN cliente/obra/dirección
  const tableBody = [
    [
      // Titulos de la tabla
      {
        text: "CONCEPTO",
        style: "tableHeader",
        alignment: "center",
        border: [true, true, true, true],
        fillColor: "#f5f5f5",
        fontSize: 10,
      },
      {
        text: "CANT.",
        style: "tableHeader",
        alignment: "center",
        border: [true, true, true, true],
        fillColor: "#f5f5f5",
        fontSize: 9,
      },
      {
        text: "PRECIO UNITARIO",
        style: "tableHeader",
        alignment: "center",
        border: [true, true, true, true],
        fillColor: "#f5f5f5",
        fontSize: 9,
      },
      {
        text: "IMPORTE",
        style: "tableHeader",
        alignment: "center",
        border: [true, true, true, true],
        fillColor: "#f5f5f5",
        fontSize: 10,
      },
    ],
    ...products.map((product) => [
      {
        text: product.concepto,
        border: [false, false, false, false],
        fontSize: 8,
      },
      {
        text: product.cantidad.toString(),
        alignment: "center",
        border: [false, false, false, false],
        fontSize: 8,
      },

      {
        text: `$${product.precioUnitario.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        alignment: "center",
        border: [false, false, false, false],
        fontSize: 8,
      },
      //importe
      {
        text: `$ ${(product.cantidad * product.precioUnitario).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        alignment: "right",
        border: [false, false, false, false],
        fontSize: 8,
      },
    ]),
  ];

  // 🔷 ENCABEZADO
  content.push({
    columns: [
      {
        image: "logo",
        width: 100,
      },
      {
        width: "*",
        stack: [
          { text: `Trabajos de Carpintería | Cotización`, style: "header" },
          { text: `${fecha}`, style: "subheader" },
        ],
        alignment: "right",
      },
    ],
  });

  // 🟧 DATOS DEL CLIENTE (CUADRO NARANJA)
  content.push({
    margin: [0, 20, 0, 10],
    columns: [
      // 🟧 IZQUIERDA: CLIENTE
      {
        width: "50%",
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: [{ text: "CLIENTE: ", bold: true }, cliente],
                margin: [8, 6, 8, 0],
                fontSize: 10,
              },
            ],
            [
              {
                text: [{ text: "OBRA: ", bold: true }, obra],
                margin: [8, 0, 8, 0],
                fontSize: 10,
              },
            ],
            [
              {
                text: [{ text: "DIRECCIÓN: ", bold: true }, direccion],
                margin: [8, 0, 8, 5],
                fontSize: 10,
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          fillColor: () => "#f5f5f5",
        },
      },

      // 🟦 DERECHA: EMPRESA
      {
        width: "50%",
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: [
                  {
                    text: "MTRO. ",
                    bold: true,
                    alignment: "right",
                    fontSize: 10,
                  },
                  "CARLOS RAMIREZ CERÓN",
                ],
                margin: [8, 6, 8, 0],
                fontSize: 10,
                bold: true,
              },
            ],
            [
              {
                columns: [
                  { width: "*", text: "" }, // columna vacía que empuja el contenido
                  {
                    width: "auto", // ancho ajustado al contenido
                    columns: [
                      {
                        image: "telefono",
                        width: 8,
                        margin: [0, 4, 0, 0], // espacio entre imagen y texto
                      },
                      {
                        text: "55 14513651",
                        fontSize: 10,
                        margin: [3, 3, 0, 0],
                        bold: true,
                      },
                    ],
                    columnGap: 0,
                  },
                ],
                margin: [0, 0, 8, 0], // margen derecho
              },
            ],
            [
              {
                columns: [
                  { width: "*", text: "" }, // columna vacía que empuja el contenido
                  {
                    width: "auto", // ancho ajustado al contenido
                    columns: [
                      {
                        image: "mail",
                        width: 8,
                        margin: [0, 2, 0, 0], // espacio entre imagen y texto
                      },
                      {
                        text: "careba_ramirez@hotmail.com",
                        fontSize: 10,
                        margin: [3, 0, 0, 0],
                        bold: true,
                      },
                    ],
                    columnGap: 0,
                  },
                ],
                margin: [0, 0, 8, 0], // margen derecho
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          fillColor: () => "#f5f5f5",
        },
      },
    ],
  });

  content.push({ text: "\n" });

  // 📊 TABLA
  content.push({
    table: {
      headerRows: 1,
      widths: ["*", "auto", "auto", "auto"],
      body: tableBody,
    },
    layout: {
      hLineWidth: function (i: number, node: any) {
        return i === 0 || i === 1 ? 1 : 0; // solo arriba y abajo del header
      },
      vLineWidth: function (i: number, node: any) {
        return i < node.table.widths.length ? 1 : 0; // líneas verticales
      },
      hLineColor: function () {
        return "white";
      },
      vLineColor: function () {
        return "white";
      },
    },
  });

  //LINEA DE SEPARACIÓN
  content.push({
    margin: [0, 10, 0, 10], // espacio arriba y abajo
    canvas: [
      {
        type: "line",
        x1: 0,
        y1: 0,
        x2: 515, // ancho de la página (ajustable)
        y2: 0,
        lineWidth: 1,
        lineColor: "#cccccc", // color gris elegante
      },
    ],
  });

  content.push({
    margin: [0, 10, 0, 0],
    columns: [
      {
        width: "auto",
        stack: [
          { text: "" }, // espacio SUBTOTAL
          {
            text: "Si requiere factura será más el .16%",
            fontSize: 10,
            alignment: "left",
            margin: [0, 0, 0, 6],
            bold: true,
          },
          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 350,
                y2: 0,
                lineWidth: 1,
                lineColor: "#cccccc",
              },
            ],
          },
        ],
      },

      { width: "*", text: "" }, // 👈 separador flexible

      {
        width: 202, // 👈 bloque de totales más compacto
        table: {
          widths: ["auto", "auto"],
          body: [
            [
              {
                text: "SUBTOTAL CARPINTERÍA: ",
                bold: true,
                alignment: "right",
                fillColor: "#f5f5f5",
                fontSize: 9,
                margin: [0, 0, 3, 0],
              },
              {
                text: `$${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                alignment: "right",
                fillColor: "#f5f5f5",
                fontSize: 10,
              },
            ],
            [
              {
                text: "IVA:",
                bold: true,
                alignment: "right",
                fillColor: "#f5f5f5",
                fontSize: 10,
                border: [false, false, false, true],
              },
              {
                text: `$${iva.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                alignment: "right",
                fillColor: "#f5f5f5",
                fontSize: 10,
                border: [false, false, false, true],
              },
            ],
            [
              {
                text: "TOTAL: ",
                bold: true,
                alignment: "right",
                fillColor: "#f5f5f5",
                fontSize: 10,
                margin: [0, 0, 2, 0],
              },
              {
                text: `$${totalGeneral.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                alignment: "right",
                fillColor: "#f5f5f5",
                fontSize: 10,
                bold: true,
              },
            ],
          ],
        },
        layout: {
          hLineWidth: (i: number) => (i === 2 ? 0.5 : 0),
          vLineWidth: () => 0,
          hLineColor: () => "#cccccc",
          paddingLeft: () => 0,
          paddingRight: () => 0,
        },
      },
    ],
  });

  // 📄 NOTAS
  console.log("NOTAS EN PDF:", notas);
  content.push({
    columns: [
      {
        width: "*",
        stack: [
          {
            text: "NOTAS",
            bold: true,
            fontSize: 11,
            margin: [0, 0, 0, 5],
          },
          {
            text: notas || "Ninguna",
            fontSize: 9,
            margin: [0, 0, 0, 0],
          },
        ],
      },
    ],
    margin: [0, 30, 0, 0],
  });

  //LINEA DE SEPARACIÓN
  content.push({
    margin: [0, 10, 0, 10], // espacio arriba y abajo
    canvas: [
      {
        type: "line",
        x1: 0,
        y1: 0,
        x2: 515, // ancho de la página (ajustable)
        y2: 0,
        lineWidth: 1,
        lineColor: "#cccccc", // color gris elegante
      },
    ],
  });

  // 🟦 TERMINOS + QR EN MISMA FILA
  content.push({
    columns: [
      // 📄 TERMINOS (lado izquierdo)
      {
        width: "*",
        stack: [
          {
            text: "TÉRMINOS DEL SERVICIO",
            bold: true,
            fontSize: 11,
            margin: [0, 0, 0, 5],
          },
          {
            text:
              "• No hay devoluciones una vez iniciado el servicio.\n" +
              "• El cliente es responsable de validar la información.\n" +
              "• Se aplicará un cargo adicional a cualquier cambio realizado al diseño después de haber sido autorizado.  \n" +
              "• Garantía válida únicamente por defectos de instalación.",
            fontSize: 9,
          },
        ],
      },

      // 🟦 QR (lado derecho)
      // {
      //   width: 80,
      //   qr: "https://www.youtube.com/@vilcadev",
      //   fit: 90,
      //   alignment: "right",
      // },
    ],
    margin: [0, 10, 0, 0],
  });

  const docDefinition: any = {
    content,
    styles,
    images: {
      logo: logoBase64,
      facebook: facebook,
      instagram: instagram,
      telefono: telefono,
      mail: mail,
    },
    footer: (currentPage: number, pageCount: number) => {
      return {
        margin: [40, 10, 40, 0],
        stack: [
          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 515,
                y2: 0,
                lineWidth: 0.5,
              },
            ],
          },
          {
            margin: [0, 2, 0, 0],
            columns: [
              {
                columns: [
                  // 🔵 Facebook grupo
                  {
                    columns: [
                      { image: "facebook", width: 10, margin: [0, 3, 0, 0] },
                      {
                        text: " carpinteriacareba",
                        fontSize: 10,
                        margin: [3, 3, 0, 0],
                      },
                    ],
                    margin: [0, 0, 15, 0], // 🔥 espacio entre FB e IG
                    width: "auto",
                  },

                  // 🟣 Instagram grupo
                  {
                    columns: [
                      { image: "instagram", width: 10, margin: [0, 3, 0, 0] },
                      {
                        text: " careba.oficial",
                        fontSize: 10,
                        margin: [3, 3, 0, 0],
                      },
                    ],
                    width: "auto",
                  },
                ],
                width: "*",
              },

              // 📄 Paginación
              {
                text: `${currentPage} de ${pageCount}`,
                fontSize: 10,
                alignment: "right",
                width: "auto",
                noWrap: true,
              },
            ],
          },
        ],
      };
    },
  };

  pdfMake.createPdf(docDefinition).open();
};

export default generatePDF;
