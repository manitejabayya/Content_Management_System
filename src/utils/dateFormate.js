export default function dateFromate(date){
    return new Date(date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})
}