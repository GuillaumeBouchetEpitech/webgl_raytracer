

#
## NAME(S)

TARGET_BULLETJS=					bulletJs.0.0.1.js
TARGET_BULLET_LINEARMATH=	lib_linearmath.bc
TARGET_BULLET_COLLISION=	lib_collision.bc
TARGET_BULLET_DYNAMICS=		lib_dynamics.bc
# TARGET_BULLET_SOFTBODY=		lib_softbody.bc

## /NAME(S)
#

#
## PATH(S)

PATH_SRC=           ./src
PATH_BULLET=        $(PATH_SRC)/thirdparty/bullet3/src
PATH_OBJDIR=        ./obj
PATH_MAIN_OBJDIR=   $(PATH_OBJDIR)/main
PATH_BULLET_OBJDIR= $(PATH_OBJDIR)/bullet3
PATH_LIB=           ./lib
PATH_BUILD=         ../build

## /PATH(S)
#


#
## SRC(S)

SRC_MAIN= \
	$(wildcard \
		$(PATH_SRC)/*.cpp \
		$(PATH_SRC)/bullet-js/*.cpp \
	)

SRC_BULLET_LINEARMATH= \
	$(wildcard \
		$(PATH_BULLET)/LinearMath/*.cpp \
	)

SRC_BULLET_COLLISION=	\
	$(wildcard \
		$(PATH_BULLET)/BulletCollision/*.cpp \
		$(PATH_BULLET)/BulletCollision/BroadphaseCollision/*.cpp \
		$(PATH_BULLET)/BulletCollision/CollisionDispatch/*.cpp \
		$(PATH_BULLET)/BulletCollision/CollisionShapes/*.cpp \
		$(PATH_BULLET)/BulletCollision/Gimpact/*.cpp \
		$(PATH_BULLET)/BulletCollision/NarrowPhaseCollision/*.cpp \
	)

SRC_BULLET_DYNAMICS= \
	$(wildcard \
		$(PATH_BULLET)/BulletDynamics/*.cpp \
		$(PATH_BULLET)/BulletDynamics/Character/*.cpp \
		$(PATH_BULLET)/BulletDynamics/ConstraintSolver/*.cpp \
		$(PATH_BULLET)/BulletDynamics/Dynamics/*.cpp \
		$(PATH_BULLET)/BulletDynamics/Featherstone/*.cpp \
		$(PATH_BULLET)/BulletDynamics/MLCPSolvers/*.cpp \
		$(PATH_BULLET)/BulletDynamics/Vehicle/*.cpp \
	)

# SRC_BULLET_SOFTBODY=	$(wildcard \
# 		$(PATH_BULLET)/BulletSoftBody/*.cpp \
# 	)

## /SRC(S)
#

#
## OBJ(S)

OBJ_MAIN= $(patsubst %.cpp, \
			$(PATH_MAIN_OBJDIR)/%.o, \
			$(SRC_MAIN))

OBJ_BULLET_LINEARMATH= $(patsubst %.cpp, \
			$(PATH_BULLET_OBJDIR)/linearmath/%.o, \
			$(SRC_BULLET_LINEARMATH))
OBJ_BULLET_COLLISION= $(patsubst %.cpp, \
			$(PATH_BULLET_OBJDIR)/collision/%.o, \
			$(SRC_BULLET_COLLISION))
OBJ_BULLET_DYNAMICS= $(patsubst %.cpp, \
			$(PATH_BULLET_OBJDIR)/dynamic/%.o, \
			$(SRC_BULLET_DYNAMICS))
# OBJ_BULLET_SOFTBODY=	$(patsubst %.cpp, \
# 			$(PATH_BULLET_OBJDIR)/softbody/%.o, \
# 			$(SRC_BULLET_SOFTBODY))

## /OBJ(S)
#






#######

CXX=em++
AR=emar
# WEBIDL_BINDER=$(EMSCRIPTEN)/tools/webidl_binder.py
WEBIDL_BINDER=$(EMSDK)/upstream/emscripten/tools/webidl_binder.py

OPTIMISATION_FLAG=	-O3

CXXFLAGS=	$(OPTIMISATION_FLAG) \
			-std=c++11 \
			-I$(PATH_SRC) \
			-I$(PATH_BULLET)
# -s "DEMANGLE_SUPPORT=1"

LDFLAGS=	$(OPTIMISATION_FLAG)

# # value must be a power of 2 (16, 32, 64, etc.).
# # suffixes must be one of those: KB, MB, GB, TB.
# # Compile with ALLOW_MEMORY_GROWTH if you want a growable heap (slower though).
# LDFLAGS+=	-s TOTAL_MEMORY=64MB

# used for the callbacks about: beginContact, updateContact, endContact, etc.
LDFLAGS+=	-s "RESERVED_FUNCTION_POINTERS=1"
LDFLAGS+=	-s "EXTRA_EXPORTED_RUNTIME_METHODS=['cwrap', 'addFunction']"

# Link Time Optimisation (LTO)
LDFLAGS+=	--llvm-lto 1

# # result is one only file
# LDFLAGS+=	-s SINGLE_FILE=1

# # final file size optimisation
# LDFLAGS+=	-s AGGRESSIVE_VARIABLE_ELIMINATION=1 \
# 			-s ELIMINATE_DUPLICATE_FUNCTIONS=1

# # library specific
# LDFLAGS+=	-s "EXPORT_NAME='bulletjs'" \
# 			-s NO_EXIT_RUNTIME=1 \
# 			-s NO_FILESYSTEM=1 \
# 			-s NO_DYNAMIC_EXECUTION=1 \
# 			-s MODULARIZE=1 \
# 			-s EXPORTED_RUNTIME_METHODS=[]

# library specific
LDFLAGS+=	-s "EXPORT_NAME='bulletJsLoader'"
LDFLAGS+=	-s "NO_EXIT_RUNTIME=1"
LDFLAGS+=	-s "NO_FILESYSTEM=1"
LDFLAGS+=	-s "NO_DYNAMIC_EXECUTION=1"
LDFLAGS+=	-s "MODULARIZE=1"
LDFLAGS+=	-s "EXPORTED_RUNTIME_METHODS=[]"

# include the glue code
LDFLAGS+=	--post-js $(PATH_MAIN_OBJDIR)/glue.js
LDFLAGS+=	--post-js $(PATH_SRC)/js/post.js

# include library
# LDFLAGS+=	\
# 			$(PATH_LIB)/$(TARGET_BULLET_SOFTBODY) \
# 			$(PATH_LIB)/$(TARGET_BULLET_DYNAMICS) \
# 			$(PATH_LIB)/$(TARGET_BULLET_COLLISION) \
# 			$(PATH_LIB)/$(TARGET_BULLET_LINEARMATH)
LDFLAGS+=	\
			$(PATH_LIB)/$(TARGET_BULLET_DYNAMICS) \
			$(PATH_LIB)/$(TARGET_BULLET_COLLISION) \
			$(PATH_LIB)/$(TARGET_BULLET_LINEARMATH)

LDFLAGS+=	-s WASM=1

RM=			rm -rf

#######


#
## RULE(S)

all:			buildModule

ensurefolders:
				mkdir -p $(PATH_BUILD)
				mkdir -p $(PATH_LIB)
				mkdir -p $(PATH_MAIN_OBJDIR)
				mkdir -p $(PATH_BULLET_OBJDIR)

generateBinding:	ensurefolders
					python $(WEBIDL_BINDER) bulletjs.idl $(PATH_MAIN_OBJDIR)/glue

buildModule:	generateBinding
				$(MAKE) $(OBJ_MAIN)
				$(CXX) $(CXXFLAGS) $(OBJ_MAIN) -o $(PATH_BUILD)/$(TARGET_BULLETJS) $(LDFLAGS)

# bullet: linearmath collision dynamics softbody
bullet: linearmath collision dynamics

linearmath:	ensurefolders
			$(MAKE) $(OBJ_BULLET_LINEARMATH)
			$(AR) cr $(PATH_LIB)/$(TARGET_BULLET_LINEARMATH) $(OBJ_BULLET_LINEARMATH)

collision:	ensurefolders
			$(MAKE) $(OBJ_BULLET_COLLISION)
			$(AR) cr $(PATH_LIB)/$(TARGET_BULLET_COLLISION) $(OBJ_BULLET_COLLISION)

dynamics:	ensurefolders
			$(MAKE) $(OBJ_BULLET_DYNAMICS)
			$(AR) cr $(PATH_LIB)/$(TARGET_BULLET_DYNAMICS) $(OBJ_BULLET_DYNAMICS)

# softbody:	ensurefolders
# 			$(MAKE) $(OBJ_BULLET_SOFTBODY)
# 			$(AR) cr $(PATH_LIB)/$(TARGET_BULLET_SOFTBODY) $(OBJ_BULLET_SOFTBODY)

#

# for every ".cpp" file
# => ensure the "obj" folder(s)
# => compile in a ".o" file

$(PATH_MAIN_OBJDIR)/%.o: %.cpp
	@mkdir -p `dirname $@`
	$(CXX) $(CXXFLAGS) $< -c -o $@

$(PATH_BULLET_OBJDIR)/linearmath/%.o: %.cpp
	@mkdir -p `dirname $@`
	$(CXX) $(CXXFLAGS) $< -c -o $@

$(PATH_BULLET_OBJDIR)/collision/%.o: %.cpp
	@mkdir -p `dirname $@`
	$(CXX) $(CXXFLAGS) $< -c -o $@

$(PATH_BULLET_OBJDIR)/dynamic/%.o: %.cpp
	@mkdir -p `dirname $@`
	$(CXX) $(CXXFLAGS) $< -c -o $@

# $(PATH_BULLET_OBJDIR)/softbody/%.o: %.cpp
# 	@mkdir -p `dirname $@`
# 	$(CXX) $(CXXFLAGS) $< -c -o $@

#

clean:
			$(RM) $(PATH_MAIN_OBJDIR)

fclean:		clean
			$(RM) $(PATH_BUILD)

re:			fclean all

clean_bullet:
				$(RM) $(PATH_BULLET_OBJDIR)

fclean_bullet:	clean_bullet
				$(RM) $(PATH_LIB)

re_bullet:		fclean_bullet bullet

# .PHONY:		all buildModule generateBinding \
# 			bullet linearmath collision dynamics softbody \
# 			clean fclean re \
# 			clean_bullet fclean_bullet re_bullet
.PHONY:		all buildModule generateBinding \
			bullet linearmath collision dynamics \
			clean fclean re \
			clean_bullet fclean_bullet re_bullet

## RULE(S)
#
