 // static data (solo como valor inicial hasta que llegue el fetch)
import { authorData } from '@/data/static/author';

// Es una buena práctica definir los tipos de datos que esperas
interface UserProfile {
  id: number;
  profileImage?: string;
  // ...añade aquí otras propiedades que esperes del usuario
}

const AuthorProfilePageRetro = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. Obtener el ID del usuario desde el localStorage
        const storedData = localStorage.getItem('userData');
        if (!storedData) {
          throw new Error('No se encontraron datos de usuario en localStorage.');
        }
        const userId = JSON.parse(storedData)?.id;
        if (!userId) {
          throw new Error('El ID de usuario no es válido.');
        }

        // 2. Llamar a la API para obtener TODOS los usuarios.
        // En Vercel, no necesitas la URL completa, una ruta relativa es suficiente.
        const response = await fetch(`/api/users`);
        if (!response.ok) {
          throw new Error(`Error de red: ${response.statusText}`);
        }
        const data = await response.json();

        // 3. Encontrar el usuario específico
        const foundUser = data.users?.find((u: any) => u.id === userId);

        if (!foundUser) {
          // ¡Aquí está la clave! Si no se encuentra, lanzamos el error exacto que ves.
          throw new Error('Error! No Result Found');
        }

        setUser(foundUser);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Ocurrió un error inesperado.';
        console.error('Fallo al cargar el perfil:', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (isLoading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando perfil...</div>;
  if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>; // Mostramos el error en la UI

  return (
    <>
      {/* ====== Portada (cover) ====== */}
      <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
        <Image
          src={authorData?.cover_image?.thumbnail}
          placeholder="blur"
          priority
          quality={100}
          className="h-96 w-full object-cover"
          alt="Cover Image"
        />
      </div>

      {/* ====== Avatar + Perfil ====== */}
      <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        <Avatar
          size="xl"
          image={user?.profileImage || authorData?.avatar?.thumbnail}
          alt="Author"
          className="
            z-10 
            3xl:-mt-20
          "
        />
        {/* Ahora podemos pasar los datos del usuario a los componentes hijos */}
        <RetroProfile userData={user} />
      </div>
    </>
  );
