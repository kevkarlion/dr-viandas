export default function ProfileSkeleton() {
      return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg my-5  animate-pulse">
          <div className="flex items-center justify-between mb-6">
            {/* Título y botón de edición */}
            <div className="w-40 h-6 bg-gray-200 rounded"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          </div>
    
          <div className="flex flex-col md:flex-row gap-6">
            {/* Skeleton para el avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gray-200"></div>
            </div>
    
            {/* Skeleton para los campos del formulario */}
            <div className="flex-grow space-y-4">
              {/* Nombre */}
              <div>
                <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              {/* Email */}
              <div>
                <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              {/* Teléfono */}
              <div>
                <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              {/* Dirección */}
              <div>
                <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              {/* Preferencias Alimentarias */}
              <div>
                <div className="w-40 h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              {/* Botón guardar cambios */}
              <div className="w-full md:w-40 h-12 bg-gray-300 rounded mt-4"></div>
            </div>
          </div>
        </div>
      );
    }
    