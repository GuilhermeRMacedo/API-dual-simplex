 module.exports = function toDual(primal){
    
    let dualVariables = Array()  
    let dualRestrictions = Array()
    let dualVarRestrictions = Array()
    
    
    primal.restrictions.forEach(element => {
        dualVariables.push({
            id: element.id,
            val: element.val
        })
                
        if(primal.type === types.MAX) {
            dualVarRestrictions.push({
                var_id: element.id,
                equality: reverseEquality(element.equality)
            })
        }else{
            dualVarRestrictions.push({
                var_id: element.id,
                equality: element.equality
            })
        }
    })

    primal.variables.forEach(element => {
        let varPresence = Array()

        primal.restrictions.forEach(restriction => {
        
            restriction.restriction_var.forEach(variable => {
 
                if(variable.var_id == element.id){
                    varPresence.push({
                        var_id: restriction.id,
                        val: variable.val
                    })
                }
            })
        })

        var restrictionEquality 
        primal.varRestrictions.forEach(varRestriction =>{
          
            if(varRestriction.var_id == element.id){
                if(primal.type === types.MAX){
                    restrictionEquality = varRestriction.equality
                }else{
                    restrictionEquality = reverseEquality(varRestriction.equality)
                }
            }
        })
        
        dualRestrictions.push({
            id: element.id,
            restriction_var: varPresence,
            equality: restrictionEquality,
            val: element.val
        })

    })
  
    
    return {
        type: reverseType(primal.type),
        variables: dualVariables,
        restrictions: dualRestrictions,
        varRestrictions: dualVarRestrictions

    }

    
}

const types = {
    MAX : 'Max',
    MIN : 'Min'
}

const equality = {
    LESS : "<=",
    EQUAL : "=",
    PLUS : ">=",
    FREE : "" 
}


function reverseEquality(elementEquality){
    switch (elementEquality) {
        case equality.PLUS:
            return equality.LESS
        case equality.EQUAL:
            return equality.FREE
        case equality.LESS:
            return equality.PLUS
        case equality.FREE:
            return equality.EQUAL
        default:

            break
    }
}

function reverseType(type){
    switch(type){
        case types.MIN:
            return types.MAX
        case types.MAX:
            return types.MIN
    }
}