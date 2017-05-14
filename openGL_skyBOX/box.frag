#version 330 core
out vec4 color;
in vec3 Normal;
in vec3 FragPos;
in vec2 TexCoord;
in vec3 Position;
uniform vec3 cameraPos;
uniform samplerCube skybox;
uniform vec3 objectColor;
uniform vec3 lightColor;
uniform vec3 lightPos;
uniform vec3 viewPos;


struct Material{
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};
uniform Material material;

struct Light
{
    vec3 position;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};
uniform Light light;

void main()
{
//����
//	float ratio = 1.00 / 1.52;
//  vec3 I = normalize(Position - cameraPos);
//  vec3 R = refract(I, normalize(Normal), ratio);

//����
	vec3 I = normalize(Position - cameraPos);
    vec3 R = reflect(I, normalize(Normal));
	
	vec3 ambient = light.ambient * vec3(texture(skybox, R));
	vec3 norm = normalize(Normal);
	vec3 lightDir = normalize(lightPos - FragPos);
	float diff = max(dot(norm, lightDir), 0.0);
	vec3 diffuse = light.diffuse * (diff * vec3(texture(skybox, R)));
	vec3 viewDir = normalize(viewPos - FragPos);
	vec3 reflectDir = reflect(-lightDir, norm);
	float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
	vec3 specular = light.specular * (spec * material.specular);
    vec3 result = (ambient + diffuse + specular) * objectColor;
	color = vec4(result,1.0f);
}