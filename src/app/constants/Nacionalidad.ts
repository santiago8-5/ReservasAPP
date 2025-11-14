export enum NacionalidadCodigo {
  MEXICANA = 1,
  ESTADOUNIDENSE = 2,
  CANADIENSE = 3,
  ESPANOLA = 4,
  ARGENTINA = 5,
  COLOMBIANA = 6,
  BRASILENA = 7,
  FRANCESA = 8,
  ALEMANA = 9,
  ITALIANA = 10,
  BRITANICA = 11,
  CHINA = 12,
  JAPONESA = 13,
  AUSTRALIANA = 14,
  RUSA = 15,
  INDIA = 16,
  CUBANA = 17,
  VENEZOLANA = 18,
  PERUANA = 19,
  CHILENA = 20,
}

export interface Nacionalidad {
  codigo: NacionalidadCodigo; // number
  descripcion: string;
  codigoPais: string;
}

export const nacionalidades: Nacionalidad[] = [
  {
    codigo: NacionalidadCodigo.MEXICANA,
    descripcion: 'Mexicana',
    codigoPais: 'MX',
  },
  {
    codigo: NacionalidadCodigo.ESTADOUNIDENSE,
    descripcion: 'Estadounidense',
    codigoPais: 'US',
  },
  {
    codigo: NacionalidadCodigo.CANADIENSE,
    descripcion: 'Canadiense',
    codigoPais: 'CA',
  },
  {
    codigo: NacionalidadCodigo.ESPANOLA,
    descripcion: 'Española',
    codigoPais: 'ES',
  },
  {
    codigo: NacionalidadCodigo.ARGENTINA,
    descripcion: 'Argentina',
    codigoPais: 'AR',
  },
  {
    codigo: NacionalidadCodigo.COLOMBIANA,
    descripcion: 'Colombiana',
    codigoPais: 'CO',
  },
  {
    codigo: NacionalidadCodigo.BRASILENA,
    descripcion: 'Brasileña',
    codigoPais: 'BR',
  },
  {
    codigo: NacionalidadCodigo.FRANCESA,
    descripcion: 'Francesa',
    codigoPais: 'FR',
  },
  {
    codigo: NacionalidadCodigo.ALEMANA,
    descripcion: 'Alemana',
    codigoPais: 'DE',
  },
  {
    codigo: NacionalidadCodigo.ITALIANA,
    descripcion: 'Italiana',
    codigoPais: 'IT',
  },
  {
    codigo: NacionalidadCodigo.BRITANICA,
    descripcion: 'Británica',
    codigoPais: 'GB',
  },
  { codigo: NacionalidadCodigo.CHINA, descripcion: 'China', codigoPais: 'CN' },
  {
    codigo: NacionalidadCodigo.JAPONESA,
    descripcion: 'Japonesa',
    codigoPais: 'JP',
  },
  {
    codigo: NacionalidadCodigo.AUSTRALIANA,
    descripcion: 'Australiana',
    codigoPais: 'AU',
  },
  { codigo: NacionalidadCodigo.RUSA, descripcion: 'Rusa', codigoPais: 'RU' },
  { codigo: NacionalidadCodigo.INDIA, descripcion: 'India', codigoPais: 'IN' },
  {
    codigo: NacionalidadCodigo.CUBANA,
    descripcion: 'Cubana',
    codigoPais: 'CU',
  },
  {
    codigo: NacionalidadCodigo.VENEZOLANA,
    descripcion: 'Venezolana',
    codigoPais: 'VE',
  },
  {
    codigo: NacionalidadCodigo.PERUANA,
    descripcion: 'Peruana',
    codigoPais: 'PE',
  },
  {
    codigo: NacionalidadCodigo.CHILENA,
    descripcion: 'Chilena',
    codigoPais: 'CL',
  },
];

export function nacionalidadFromCodigo(codigo: number): Nacionalidad {
  const n = nacionalidades.find((x) => x.codigo === codigo);
  if (!n) throw new Error(`No existe Nacionalidad con el id: ${codigo}`);
  return n;
}

export function nacionalidadFromDescripcion(descripcion: string): Nacionalidad {
  const n = nacionalidades.find(
    (x) => x.descripcion.toLowerCase() === descripcion.trim().toLowerCase()
  );
  if (!n)
    throw new Error(
      `No existe Nacionalidad con la descripción: ${descripcion}`
    );
  return n;
}

export function nacionalidadFromCodigoPais(codigoPais: string): Nacionalidad {
  const n = nacionalidades.find(
    (x) => x.codigoPais.toLowerCase() === codigoPais.trim().toLowerCase()
  );
  if (!n)
    throw new Error(`No existe Nacionalidad con código de país: ${codigoPais}`);
  return n;
}
